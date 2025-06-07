import { getCities, getCommunes } from "@/api/addressApi";
import { AdminContainerComponent, BackComponent, ButtonComponent, InputComponent, SelectComponent, TextComponent, UploadDocumentComponent } from "@/components";
import { loadingStore } from "@/store";
import { SelectBox } from "@/types/ComponentType";
import { ProviderDetailType, UpdateProviderPayload } from "@/types/Provider";
import { useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import './EditProvider.scss';
import { updateProvider } from "@/api/providerApi";
import { postUploadFile } from "@/api/uploadApi";

interface IProps {
  setIsShowEdit: React.Dispatch<React.SetStateAction<boolean>>;
  setIsShowDetail: React.Dispatch<React.SetStateAction<boolean>>;
  data: ProviderDetailType | undefined;
  onEdited: () => void;
}

type FormValues = {
  [key: string]: string | string[] | File[] | FileList;
};

const EditProvider = (props: IProps) => {
  const { setIsShowEdit, setIsShowDetail, data, onEdited } = props;
  const [cities, setCities] = useState<SelectBox[]>([]);
  const [communes, setCommunes] = useState<SelectBox[]>([]);
  const [foundedDate, setFoundedDate] = useState<string>('');

  const { register, handleSubmit, reset, watch } = useForm<FormValues>();

  const { showLoading, hideLoading } = loadingStore();

  useEffect(() => {
    fetchCities();
    fetchCommunes();
    if (data) {
      const date = new Date(data.ngayThanhLap);
      setFoundedDate(`${date.getFullYear()}-${date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1}-${date.getDate() < 10 ? '0' + (date.getDate()) : date.getDate()}`);
    }
  }, []);

  useEffect(() => {
    const cityId = typeof watch('city') === 'undefined' ? 'DN' : watch('city') as string;
    fetchCommunes(cityId);
  }, [watch('city')]);

  const onSubmit: SubmitHandler<FormValues> = async (formData) => {
    const fileArray = formData['license-docs'];
    if (fileArray instanceof FileList) {
      let docUrls = []
      if (fileArray.length > 0) {
        docUrls = await handleUpload(fileArray);
      }
      const payload: UpdateProviderPayload = {
        tenNhaCungCap: formData['provider-name'].toString(),
        ngayThanhLap: formData['founded-date'] === '' ? new Date(data?.ngayThanhLap + '') : new Date(formData['founded-date'] + ''),
        trangThaiHoatDong: +formData['status'],
        maPhuongXa: formData['commune'].toString(),
        chiTietDiaChi: formData['address-detail'].toString(),
        moTa: formData['description'].toString(),
        giayToPhapLy: docUrls.length > 0 ? docUrls.map((doc: {url: string, type: string}) => doc.url) : data?.giayToPhapLy
      }
      const updateResult = await updateProvider(data?.maNhaCungCap + '', payload);
      console.log('Insert result:', updateResult);
      setIsShowEdit(false);
      setIsShowDetail(false);
      onEdited();
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

  return (
    <>
      {data && cities && communes && (
        <div className="edit-provider-component">
          <BackComponent
            onBack={() => {
              setIsShowDetail(true);
              setIsShowEdit(false);
            }}
            backTitle="Quay lại chi tiết nhà cung cấp"
          />
          <TextComponent
            text={data.tenNhaCungCap}
            title
          />
          <form className="edit-provider-body" onSubmit={handleSubmit(onSubmit)}>
            <AdminContainerComponent
              title="Thông tin nhà cung cấp"
              className="info-container"
              children={
                <>
                  <div className="general-info">
                    <InputComponent
                      name="provider-id"
                      placeholder={data.maNhaCungCap}
                      title="Mã nhà cung cấp"
                      defaultValue
                      isReadOnly
                    />
                    <InputComponent
                      name="provider-name"
                      placeholder={data.tenNhaCungCap}
                      title="Tên nhà cung cấp"
                      register={register}
                      isRequired
                      defaultValue
                    />
                    <InputComponent
                      name="founded-date"
                      title="Ngày thành lập"
                      register={register}
                      placeholder={foundedDate}
                      defaultValue
                      isRequired
                      type="date"
                    />
                    <SelectComponent
                      name="status"
                      title="Trạng thái hoạt động"
                      register={register}
                      defaultValue
                      placeholder={data.trangThaiHoatDong + ''}
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
                      defaultValue
                      placeholder={data.maTinhThanhPho}
                      register={register}
                    />
                    <SelectComponent
                      items={communes}
                      name="commune"
                      isRequired
                      title="Phường/xã"
                      defaultValue
                      placeholder={data.maPhuongXa}
                      register={register}
                    />
                    <InputComponent
                      name="address-detail"
                      title="Địa chỉ chi tiết"
                      placeholder={data.chiTietDiaChi}
                      defaultValue
                      isRequired
                      register={register}
                      styles={{ gridColumn: 'span 2' }}
                    />
                  </div>
                  <div className="description">
                    <InputComponent
                      name="description"
                      placeholder={data.moTa}
                      defaultValue
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
              title="Thông tin giấy tờ pháp lý thay thế (nếu có)"
              className="docs-container"
              children={
                <UploadDocumentComponent
                  id="license-docs"
                  name="license-docs"
                  register={register}
                  watch={watch}
                />
              }
            />
            <div className="provider-info-footer">
              <ButtonComponent
                onClick={() => reset()}
                className="btn-cancel"
                label="Hủy thay đổi"
                type="no-submit"
              />
              <ButtonComponent
                label="Lưu"
                type="submit"
                variant="primary"
              />
            </div>
          </form>
        </div>
      )}
    </>
  );
};

export default EditProvider;
