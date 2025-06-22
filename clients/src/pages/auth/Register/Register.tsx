import { getCities, getCommunes } from "@/api/addressApi";
import { registerUser, verifyEmail } from "@/api/userApi";
import GoogleIcon from '@/assets/svgs/google-icon.svg';
import { ButtonComponent, ErrorMessage, InputComponent, LoadingComponent, Overlay, SelectComponent } from "@/components";
import { loadingStore, overlayStore } from "@/store";
import { SelectBox } from "@/types/ComponentType";
import { FormValues } from "@/types/Object";
import { InsertUserPayload } from "@/types/User";
import isValidPassword from "@/utils/isValidPassword";
import { useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { IoClose } from "react-icons/io5";
import { Link, useNavigate } from "react-router-dom";
import './Register.scss';
const Register = () => {
  const [errorMessage, setErrorMessage] = useState('');
  const [cities, setCities] = useState<SelectBox[]>([]);
  const [communes, setCommunes] = useState<SelectBox[]>([]);
  const [isShowConfirmCode, setIsShowConfirmCode] = useState(false);
  const [verifyData, setVerifyData] = useState<{ email: string, token: string; }>({ email: '', token: '' });
  const navigate = useNavigate();
  const { showLoading, hideLoading, isShowLoading } = loadingStore();
  const { showOverlay, hideOverlay, isShowOverlay } = overlayStore();

  const { register, handleSubmit, watch } = useForm<FormValues>();

  useEffect(() => {
    fetchCities();
    fetchCommunes();
  }, []);

  useEffect(() => {
    const cityId = typeof watch('city') === 'undefined' ? 'DN' : watch('city') as string;
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

  const fetchCommunes = async (cityId: string = 'DN') => {
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

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    const payload: InsertUserPayload = {
      hoTen: data['fullname'].toString(),
      gioiTinh: +data['gender'],
      ngaySinh: new Date(data['dob'] + ''),
      soDienThoai: data['phone-number'].toString(),
      maPhuongXa: data['commune'].toString(),
      chiTietDiaChi: data['detail-address'].toString(),
      matKhau: data['password'].toString(),
      hinhAnh: '',
      maVaiTro: 'VT004',
      email: data['email'].toString()
    };
    if (payload.matKhau.length < 8) {
      setErrorMessage('Mật khẩu phải lớn hơn 8 ký tự!');
    } else if (!isValidPassword(payload.matKhau + '')) {
      setErrorMessage('Mật khẩu phải chứa ít nhất 1 ký tự in hoa, 1 chữ số, 1 ký tự đặc biệt!');
    } else if (payload.matKhau !== data['confirm-password']) {
      setErrorMessage('Nhập lại mật khẩu phải trùng với mật khẩu!');
    } else {
      setErrorMessage('');
      try {
        showLoading();
        const registerResult = await registerUser(payload);
        showOverlay();
        setVerifyData({ email: payload.email, token: registerResult.token });
        setIsShowConfirmCode(true);
        hideLoading();
      } catch (error) {
        setErrorMessage('Đăng ký thất bại');
      }
    }
  };

  const onConfirmCodeSubmit: SubmitHandler<FormValues> = async (data) => {
    const payload: { email: string, code: string, token: string; } = {
      email: verifyData.email,
      code: data['confirm-code'].toString(),
      token: verifyData.token
    };
    try {
      const confirmResult = await verifyEmail(payload);
      console.log(confirmResult);
      hideOverlay();
      navigate('/login');
    } catch (error) {
      setErrorMessage('Mã xác minh không đúng');
    }
  };
  return (
    <>
      {isShowOverlay && <Overlay />}
      {isShowLoading && <LoadingComponent />}
      <div className="register-component">
        <h1>Đăng ký</h1>
        <form className="register-form" action="" onSubmit={handleSubmit(onSubmit)}>
          <InputComponent
            name="fullname"
            title="Họ tên"
            placeholder="Nhập họ tên của bạn"
            isRequired
            register={register}
          />
          <div className="gender-dob-phonenumber">
            <SelectComponent
              title="Giới tính"
              name="gender"
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
              defaultValue
              isRequired
              register={register}
            />
            <InputComponent
              name="dob"
              title="Ngày sinh"
              isRequired
              type="date"
              register={register}
            />
            <InputComponent
              name="phone-number"
              title="Số điện thoại"
              placeholder="Nhập số điện thoại của bạn"
              isRequired
              styles={{ flex: 1 }}
              register={register}
            />
          </div>
          <div className="city-commune-address">
            <SelectComponent
              title="Tỉnh/thành phố"
              name="city"
              items={cities}
              defaultValue
              isRequired
              register={register}
            />
            <SelectComponent
              title="Phường/xã"
              name="commune"
              items={communes}
              defaultValue
              isRequired
              register={register}
            />
            <InputComponent
              name="detail-address"
              title="Địa chỉ chi tiết"
              placeholder="Nhập địa chỉ chi tiết của bạn"
              isRequired
              styles={{ flex: 1 }}
              register={register}
            />
          </div>
          <InputComponent
            name="email"
            title="Email"
            placeholder="Nhập email của bạn"
            type="email"
            isRequired
            register={register}
          />
          <div className="password-box">
            <InputComponent
              name="password"
              title="Mật khẩu"
              placeholder="Nhập mật khẩu của bạn"
              type="password"
              isRequired
              styles={{ width: '50%' }}
              register={register}
              onChange={() => setErrorMessage('')}
            />
            <InputComponent
              name="confirm-password"
              title="Nhập lại mật khẩu"
              placeholder="Nhập lại mật khẩu của bạn"
              type="password"
              isRequired
              styles={{ flex: 1 }}
              register={register}
              onChange={() => setErrorMessage('')}
            />
          </div>
          {errorMessage.length > 0 && <ErrorMessage message={errorMessage} />}
          <ButtonComponent
            label='Đăng ký'
            type="submit"
            variant="secondary"
            className="btn-register"
          />
          <p>Bạn đã có tài khoản? <Link to={'/login'}>Đăng nhập ngay</Link></p>
          <span className="other-login-text">hoặc</span>
          <ButtonComponent
            label='Đăng nhập bằng Google'
            type="no-submit"
            affix={<img src={GoogleIcon} width={25} height={25} />}
            className="btn-login-with-google"
          />
        </form>
        <div className="confirm-code-component" style={{ transform: isShowConfirmCode ? 'translateY(0%)' : 'translateY(-200%)' }}>
          <div className="close-btn">
            <IoClose size={28} className="close-icon" onClick={() => {
              setIsShowConfirmCode(false);
              hideOverlay();
            }} />
          </div>
          <h1>Nhập mã xác nhận</h1>
          <p>Vui lòng điền mã xác nhận được gửi tới email: <span>{verifyData.email}</span></p>
          <form className="confirm-code-box" onSubmit={handleSubmit(onConfirmCodeSubmit)}>
            <InputComponent
              name="confirm-code"
              placeholder="Nhập mã xác nhận"
              className="confirm-code-input"
              register={register}
            />
            <ButtonComponent
              className="btn-confirm"
              label='Gửi'
              type="submit"
              variant="secondary"
            />
          </form>
          {errorMessage.length > 0 && <ErrorMessage message={errorMessage} />}
        </div>
      </div>
    </>
  );
};

export default Register;
