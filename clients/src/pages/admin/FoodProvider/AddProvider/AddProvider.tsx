import { AdminContainerComponent, BackComponent, ButtonComponent, InputComponent, SelectComponent, UploadDocumentComponent } from "@/components";
import './AddProvider.scss';
import webColors from "@/constants/webColors";
import { SubmitHandler, useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import { SelectBox } from "@/types/ComponentType";
import { loadingStore } from "@/store";
import { getCities, getCommunes } from "@/api/addressApi";
import { postUploadFile } from "@/api/uploadApi";
import { InsertProviderPayload } from "@/types/Provider";
import { insertProvider } from "@/api/providerApi";

interface IProps {
  setIsShowAdd: React.Dispatch<React.SetStateAction<boolean>>;
  onAdded: () => void;
}

type FormValues = {
  [key: string]: string | string[] | File[] | FileList;
};

const AddProvider = (props: IProps) => {
  const { setIsShowAdd, onAdded } = props;
  const [cities, setCities] = useState<SelectBox[]>([]);
  const [communes, setCommunes] = useState<SelectBox[]>([]);

  const { register, watch, handleSubmit } = useForm<FormValues>();
  const { showLoading, hideLoading } = loadingStore();

  useEffect(() => {
    fetchCities();
    fetchCommunes();
  }, []);

  useEffect(() => {
    const cityId = typeof watch('city') === 'undefined' ? 'DN' : watch('city') as string;
    fetchCommunes(cityId);
  }, [watch('city')]);

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    const fileArray = data['license-docs'];
    if (fileArray instanceof FileList) {
      const docUrls = await handleUpload(fileArray);
      const payload: InsertProviderPayload = {
        tenNhaCungCap: data['provider-name'].toString(),
        ngayThanhLap: new Date(data['founded-date'] + ''),
        trangThaiHoatDong: +data['status'],
        maPhuongXa: data['commune'].toString(),
        chiTietDiaChi: data['address-detail'].toString(),
        moTa: data['description'].toString(),
        giayToPhapLy: docUrls.map((doc: {url: string, type: string}) => doc.url)
      }
      const insertResult = await insertProvider(payload);
      console.log('Insert result:', insertResult);
      setIsShowAdd(false);
      onAdded();
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
  return (
    <>
      <div className="add-provider-component">
        <BackComponent onBack={() => setIsShowAdd(false)} backTitle="Quay lại danh sách nhà cung cấp" />
        <form className="add-provider-content" onSubmit={handleSubmit(onSubmit)}>
          <div className="body">
            <AdminContainerComponent
              title="Thông tin nhà cung cấp"
              className="info-container"
              children={
                <>
                  <div className="general-info">
                    <InputComponent
                      name="provider-name"
                      placeholder="Nhập tên nhà cung cấp"
                      styles={{ gridColumn: 'span 2' }}
                      title="Tên nhà cung cấp"
                      register={register}
                      isRequired
                    />
                    <InputComponent
                      name="founded-date"
                      title="Ngày thành lập"
                      register={register}
                      isRequired
                      type="date"
                    />
                    <SelectComponent
                      name="status"
                      title="Trạng thái hoạt động"
                      register={register}
                      items={[
                        {
                          content: 'Đang hoạt động',
                          value: '1',
                          isSelected: true
                        },
                        {
                          content: 'Ngưng hoạt động',
                          value: '0',
                          isSelected: false
                        },
                        {
                          content: 'Tạm khóa',
                          value: '2',
                          isSelected: false
                        }
                      ]}
                      isRequired
                    />
                  </div>
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
                  <div className="description">
                    <InputComponent
                      name="description"
                      placeholder="Nhập mô tả"
                      title="Mô tả"
                      register={register}
                      isRequired
                      isTextarea
                    />
                  </div>
                </>
              }
            />
            <AdminContainerComponent
              title="Thông tin giấy tờ pháp lý"
              className="docs-container"
              children={
                <div className="provider-info">
                  <UploadDocumentComponent
                    id="license-docs"
                    name="license-docs"
                    register={register}
                    watch={watch}
                    title="Giấy tờ pháp lý"
                  />
                </div>
              }
            />
          </div>
          <div className="footer">
            <ButtonComponent
              className="btn-cancel"
              label="Hủy"
              styles={{
                color: webColors.adminPrimary,
                border: `1px solid ${webColors.adminPrimary}`
              }}
              type="no-submit"
            />
            <ButtonComponent
              className="btn-save"
              label="Lưu"
              variant="primary"
              type="submit"
            />
          </div>
        </form>
      </div>
    </>
  );
};

export default AddProvider;
