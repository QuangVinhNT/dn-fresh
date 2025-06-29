import { getCities, getCommunes, getDetailById } from "@/api/addressApi";
import { postUploadFile } from "@/api/uploadApi";
import { getRoleToken, getUserById, getUserRolesByUserId, login, updateUser } from "@/api/userApi";
import { BackComponent, ButtonComponent, InputComponent, LoadingComponent, SelectComponent, UploadImgComponent } from "@/components";
import { cartStore, favouriteFoodsStore, loadingStore, userStore } from "@/store";
import { SelectBox } from "@/types/ComponentType";
import { FormValues } from "@/types/Object";
import isValidPassword from "@/utils/isValidPassword";
import { useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { IoLogOutOutline } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import './PersonalInfo.scss';
const PersonalInfo = () => {
  const [cities, setCities] = useState<SelectBox[]>([]);
  const [communes, setCommunes] = useState<SelectBox[]>([]);
  const [errorMessage, setErrorMessage] = useState('');
  const [userInfo, setUserInfo] = useState<any>();
  const [link, setLink] = useState<string>('');
  const navigate = useNavigate();
  const { user, clearUser, setUser, setRoleUser } = userStore();
  const { clearCart } = cartStore();
  const { clearFavouriteFoods } = favouriteFoodsStore();
  const { showLoading, hideLoading, isShowLoading } = loadingStore();

  const { register, watch, handleSubmit, reset } = useForm<FormValues>();

  useEffect(() => {
    fetchUser();
    fetchCities();
    fetchUserRoles();
  }, []);

  useEffect(() => {
    const cityId = watch('city') + '';
    fetchCommunes(cityId);
  }, [watch('city')]);

  const fetchCities = async () => {
    showLoading();
    try {
      const response = await getCities();
      const data = response.map((item, idx) => ({
        value: item.maTinhThanhPho,
        content: item.tenTinhThanhPho,
        isSelected: idx === 0
      }));
      setCities(data);
    } catch (error) {
      console.error('Error when load cities:', error);
    } finally {
      hideLoading();
    }
  };

  const fetchCommunes = async (cityId: string) => {
    showLoading();
    try {
      const response = await getCommunes(cityId);
      const data = response.map((item, idx) => ({
        value: item.maPhuongXa,
        content: item.tenPhuongXa,
        isSelected: idx === 0
      }));
      setCommunes(data);
    } catch (error) {
      console.error('Error when load cities:', error);
    } finally {
      hideLoading();
    }
  };

  const fetchUser = async () => {
    showLoading();
    try {
      const resUser = await getUserById(user?.id + '');
      const resAddress = await getDetailById(resUser.maDiaChi);
      const dob = new Date(resUser.ngaySinh);
      const dobStr = `${dob.getFullYear()}-${dob.getMonth() + 1 < 10 ? '0' + (dob.getMonth() + 1) : dob.getMonth() + 1}-${dob.getDate() < 10 ? '0' + (dob.getDate()) : dob.getDate()}`;
      setUserInfo({ ...resUser, ...resAddress, ngaySinh: dobStr });
      fetchCommunes(resAddress.maTinhThanhPho);
    } catch (error) {
      console.error('Error when load user:', error);
    } finally {
      hideLoading();
    }
  };

  const fetchUserRoles = async () => {
    showLoading();
    try {
      const response = await getUserRolesByUserId(user?.id + '');
      if (response.length > 1) {
        const otherRole = response.filter((role: string) => role !== user?.roleId)[0];
        const link = otherRole === 'VT001' ? '/admin' : (
          user?.roleId === 'VT002' ? '/inventory-staff' : (
            user?.roleId === 'VT003' ? '/delivery-staff' : '/'
          )
        );
        setLink(link);
        setRoleUser(otherRole);
        localStorage.removeItem('access_token');
        const token = await getRoleToken({ userId: user?.id + '', roleId: otherRole });
        localStorage.setItem('access_token', token);
      }
    } catch (error) {
      console.error('Error when load user:', error);
    } finally {
      hideLoading();
    }
  };

  console.log(link);

  const handleUpload = async (files: FileList) => {
    showLoading();
    if (files.length > 0) {
      const formData = new FormData();
      Array.from(files).forEach((file) => {
        formData.append('files', file);
      });
      try {
        const res = await postUploadFile(formData);
        if (res) {
          return res;
        }
      } catch (error) {
        console.error('Error when upload:', error);
      } finally {
        hideLoading();
      }
    }
  };

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    const fileArray = data['avatar'];
    if (fileArray instanceof FileList) {
      const imageUrls = await handleUpload(fileArray);
      let payload = {
        hoTen: data['fullname'].toString(),
        gioiTinh: +data['gender'],
        ngaySinh: new Date(data['dob'] + ''),
        soDienThoai: data['phone-number'].toString(),
        maPhuongXa: data['commune'].toString(),
        chiTietDiaChi: data['address-detail'].toString(),
        matKhau: '',
        hinhAnh: imageUrls ? imageUrls[0].url : '',
        email: userInfo.email
      };

      let errorSignal = 1;

      if (data['new-password'].toString()) {
        try {
          await login({ email: payload.email, password: data['old-password'].toString() });
          if (data['new-password'] === data['old-password']) {
            setErrorMessage('Mật khẩu mới không được trùng với mật khẩu cũ!');
            return;
          } else if (data['new-password'].toString().length < 8) {
            setErrorMessage('Mật khẩu mới phải lớn hơn 8 ký tự!');
            return;
          } else if (!isValidPassword(data['new-password'].toString())) {
            setErrorMessage('Mật khẩu phải chứa ít nhất 1 ký tự in hoa, 1 chữ số, 1 ký tự đặc biệt!');
            return;
          } else if (data['new-password'].toString() !== data['confirm-new-password']) {
            setErrorMessage('Nhập lại mật khẩu mới phải trùng với mật khẩu mới!');
            return;
          } else {
            payload = { ...payload, matKhau: data['new-password'].toString() };
            setErrorMessage('');
            errorSignal = 0;
          }
        } catch (error) {
          setErrorMessage('Mật khẩu cũ không đúng!');
        }
      } else {
        errorSignal = 0;
      }
      if (errorSignal === 0) {
        const result = await updateUser(user?.id + '', payload);
        const link = user?.roleId === 'VT001' ? '/admin' : (
          user?.roleId === 'VT002' ? '/inventory-staff' : (
            user?.roleId === 'VT003' ? '/delivery-staff' : '/'
          )
        );
        const userInfo = await getUserById(user?.id + '');
        setUser({ id: userInfo?.maNguoiDung + '', fullname: userInfo?.hoTen, image: userInfo?.hinhAnh });
        navigate(link);
      } else {
        hideLoading();
      }
    }
  };

  return (
    <>
      {isShowLoading && <LoadingComponent />}
      {userInfo && (
        <div className="personal-info-component">
          <div className="personal-info-content">
            <BackComponent backTitle="Trở về" onBack={() => { navigate(-1); }} />

            <form className="personal-info-form" onSubmit={handleSubmit(onSubmit)}>
              <div className="avatar">
                {watch('avatar') instanceof FileList && watch('avatar')?.length === 0 && userInfo.hinhAnh && (
                  <img src={userInfo.hinhAnh} alt="" />
                )}
                <UploadImgComponent
                  id="user-avatar"
                  name="avatar"
                  register={register}
                  watch={watch}
                />
              </div>
              <div className="info-box">
                <div className="row">
                  <h4 className="title">Thông tin người dùng</h4>
                  <div className="column">
                    <InputComponent
                      name="user-id"
                      placeholder={userInfo.maNguoiDung}
                      isReadOnly
                      title="Mã người dùng"
                    />
                    <SelectComponent
                      items={[
                        {
                          content: 'Nam',
                          value: '1',
                          isSelected: true
                        },
                        {
                          content: 'Nữ',
                          value: '0',
                          isSelected: false
                        }
                      ]}
                      name="gender"
                      isRequired
                      title="Giới tính"
                      register={register}
                      defaultValue
                      placeholder={userInfo.gioiTinh + ''}
                    />

                    <SelectComponent
                      title="Tỉnh/thành phố"
                      name="city"
                      items={cities}
                      register={register}
                      placeholder={userInfo.maTinhThanhPho}
                      defaultValue
                      isRequired
                    />
                  </div>
                  <div className="column">
                    <InputComponent
                      name="fullname"
                      defaultValue
                      register={register}
                      placeholder={userInfo.hoTen}
                      title="Họ và tên"
                      isRequired
                    />
                    <InputComponent
                      name="dob"
                      title="Ngày sinh"
                      type="date"
                      isRequired
                      register={register}
                      defaultValue
                      placeholder={userInfo.ngaySinh}
                    />
                    <SelectComponent
                      title="Phường/xã"
                      name="commune"
                      items={communes}
                      register={register}
                      placeholder={userInfo.maPhuongXa}
                      defaultValue
                      isRequired
                    />
                  </div>
                  <div className="column">
                    <InputComponent
                      name="email"
                      placeholder={userInfo.email}
                      title="Email"
                      isReadOnly
                      type="email"
                    />
                    <InputComponent
                      name="phone-number"
                      title="Số điện thoại"
                      placeholder={userInfo.soDienThoai}
                      isRequired
                      register={register}
                      defaultValue
                    />
                    <InputComponent
                      title="Địa chỉ"
                      name="address-detail"
                      placeholder={userInfo.chiTietDiaChi}
                      register={register}
                      defaultValue
                      isRequired
                    />
                  </div>
                </div>
                <div className="info-box" style={{ marginTop: '32px' }}>
                  <div className="row">
                    <h4 className="title">Đổi mật khẩu</h4>
                    <InputComponent
                      name="old-password"
                      title="Mật khẩu cũ"
                      placeholder="Nhập mật khẩu cũ của bạn"
                      type="password"
                      register={register}
                      onChange={() => setErrorMessage('')}
                    />
                    <InputComponent
                      name="new-password"
                      title="Mật khẩu mới"
                      placeholder="Nhập mật khẩu mới của bạn"
                      type="password"
                      register={register}
                      onChange={() => setErrorMessage('')}
                    />
                    <InputComponent
                      name="confirm-new-password"
                      title="Nhập lại mật khẩu mới"
                      placeholder="Nhập lại mật khẩu mới của bạn"
                      type="password"
                      register={register}
                      onChange={() => setErrorMessage('')}
                    />
                  </div>
                </div>
                <div className="save-cancel">
                  <ButtonComponent
                    label='Lưu'
                    type="submit"
                    variant="primary"
                  />
                  <ButtonComponent
                    label='Hủy thay đổi'
                    type="no-submit"
                    variant="danger"
                    onClick={() => {
                      reset();
                    }}
                  />
                </div>
              </div>
            </form>

            <div className="form-footer" style={{ justifyContent: 'space-between' }}>
              {link && (
                <ButtonComponent
                  label={`Chuyển tài khoản ${link === '/' ? 'Khách hàng' : (
                    link === '/admin' ? 'Quản trị viên' : (
                      link === '/inventory-staff' ? 'Nhân viên kho' : 'Nhân viên giao hàng'
                    )
                  )
                    }`}
                  className="transfer-btn"
                  type="no-submit"
                  onClick={() => {
                    navigate(link);
                  }}
                />
              )}

              <ButtonComponent
                label='Đăng xuất'
                type="no-submit"
                className="logout-btn"
                affix={<IoLogOutOutline size={22} />}
                onClick={() => {
                  localStorage.removeItem('access_token');
                  clearUser();
                  clearCart();
                  clearFavouriteFoods();
                  navigate('/');
                }}
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default PersonalInfo;
