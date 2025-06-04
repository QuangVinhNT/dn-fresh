import { AdminContainerComponent, BackComponent, ButtonComponent, InputComponent, SelectComponent, UploadImgComponent } from "@/components";
import { SelectBox } from "@/types/ComponentType";
import { useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import './AddStaff.scss';
import { getCities, getCommunes } from "@/api/addressApi";
import { loadingStore } from "@/store";
import { postUploadFile } from "@/api/uploadApi";
import { InsertUserPayload } from "@/types/User";
import { insertUser } from "@/api/userApi";

interface IProps {
  setIsShowAdd: React.Dispatch<React.SetStateAction<boolean>>;
  onAdded: () => void;
}

type FormValues = {
  [key: string]: string | string[] | File[] | FileList;
};


const AddStaff = (props: IProps) => {
  const { setIsShowAdd, onAdded } = props;
  const [cities, setCities] = useState<SelectBox[]>([]);
  const [communes, setCommunes] = useState<SelectBox[]>([]);
  const { register, handleSubmit, watch } = useForm<FormValues>();

  const { showLoading, hideLoading } = loadingStore();

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
    const fileArray = data['customer-avatar'];
    if (fileArray instanceof FileList) {
      const imageUrls = await handleUpload(fileArray);
      const payload: InsertUserPayload = {
        hoTen: data['fullname'].toString(),
        gioiTinh: +data['gender'],
        ngaySinh: new Date(data['dob'] + ''),
        soDienThoai: data['phone-number'].toString(),
        email: data['email'].toString(),
        hinhAnh: imageUrls[0].url,
        chiTietDiaChi: data['address-detail'].toString(),
        maPhuongXa: data['commune'].toString(),
        matKhau: '',
        maVaiTro: data['role-code'].toString()
      };
      const insertResult = await insertUser(payload);
      console.log('Insert result:', insertResult);
      setIsShowAdd(false);
      onAdded();
    }
  };

  return (
    <form className="add-customer-component" onSubmit={handleSubmit(onSubmit)}>
      <div className="add-customer-header">
        <BackComponent
          backTitle="Quay lại danh sách nhân sự"
          onBack={() => { setIsShowAdd(false); }}
        />
        <div className="cancel-save">
          <ButtonComponent
            className="btn-cancel"
            type="no-submit"
            label="Hủy"
            onClick={() => { }}
          />
          <ButtonComponent
            className="btn-save"
            type="submit"
            label="Lưu"
            variant="primary"
          />
        </div>
      </div>
      <div className="add-customer-body">
        <AdminContainerComponent
          className="box-avatar"
          title='Ảnh đại diện'
          children={
            <UploadImgComponent
              id="customer-avatar"
              name="customer-avatar"
              register={register}
              watch={watch}
            />
          }
        />
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', flex: 1 }}>
          <AdminContainerComponent
            title='Thông tin nhân sự'
            className="box-info"
            children={
              <div className="customer-info">
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gridColumn: 'span 2', gap: '12px' }}>
                  <InputComponent
                    name="fullname"
                    title="Họ tên"
                    placeholder="Nhập họ tên"
                    isRequired
                    register={register}
                    styles={{ gridColumn: 'span 2' }}
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
                  />
                  <InputComponent
                    name="dob"
                    title="Ngày sinh"
                    type="date"
                    isRequired
                    register={register}
                  />
                </div>
                <InputComponent
                  name="phone-number"
                  title="Số điện thoại"
                  placeholder="Nhập số điện thoại"
                  isRequired
                  register={register}
                />
                <InputComponent
                  name="email"
                  title="Email"
                  placeholder="Nhập email"
                  type="email"
                  isRequired
                  register={register}
                />
              </div>
            }
          />
          <AdminContainerComponent
            className="box-address"
            title='Địa chỉ'
            children={
              <div className="address">
                <SelectComponent
                  items={cities}
                  name="city"
                  isRequired
                  title="Tỉnh/thành phố"
                  register={register}
                />
                <SelectComponent
                  items={communes}
                  name="commune"
                  isRequired
                  title="Phường/xã"
                  register={register}
                />
                <InputComponent
                  name="address-detail"
                  title="Địa chỉ chi tiết"
                  placeholder="Nhập địa chỉ chi tiết"
                  isRequired
                  register={register}
                  styles={{ gridColumn: 'span 2' }}
                />
              </div>
            }
          />
        </div>
        <AdminContainerComponent
          title='Vai trò'
          className="box-role"
          children={
            <SelectComponent
              title="Chọn vai trò"
              isRequired
              items={[
                {
                  content: 'Nhân viên kho',
                  value: 'VT002',
                  isSelected: true
                },
                {
                  content: 'Nhân viên giao hàng',
                  value: 'VT003',
                  isSelected: false
                },
                {
                  content: 'Quản trị viên',
                  value: 'VT001',
                  isSelected: false
                }
              ]}
              name="role-code"
              register={register}
            />
          }
        />
      </div>
    </form>
  );
};

export default AddStaff;
