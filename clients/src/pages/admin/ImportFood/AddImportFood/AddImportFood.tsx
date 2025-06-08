import { getProviderById } from "@/api/providerApi";
import { AdminContainerComponent, ButtonComponent, ErrorMessage, InputComponent } from "@/components";
import { overlayStore } from "@/store";
import { ProviderDetailType } from "@/types/Provider";
import { dateFormatter } from "@/utils/datetimeFormatter";
import { useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { IoClose } from "react-icons/io5";
import './AddImportFood.scss';
import { InsertImportReceiptPayload } from "@/types/ImportReceipt";
import { insertImportReceipt } from "@/api/importReceiptApi";

interface IProps {
  setIsShowAdd: React.Dispatch<React.SetStateAction<boolean>>;
  onAdded: () => void;
}

type FormValues = {
  [key: string]: string | string[] | File[] | FileList;
};

const AddImportFood = (props: IProps) => {
  const { setIsShowAdd, onAdded } = props;
  const [provider, setProvider] = useState<ProviderDetailType>();
  const [errorMessage, setErrorMessage] = useState<string>('');

  const { hideOverlay } = overlayStore();

  const { register, reset, handleSubmit, watch } = useForm<FormValues>();

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    const payload: InsertImportReceiptPayload = {
      maNhaCungCap: data['provider-id'].toString(),
      maQuanTriVien: 'ND001',
      ghiChu: data['import-receipt-note'].toString()
    };
    const insertResult = await insertImportReceipt(payload);
    console.log('Insert result:', insertResult);
    setIsShowAdd(false);
    hideOverlay();
    setErrorMessage('');
    setProvider(undefined);
    reset();
    onAdded();
  };

  const fetchProviderById = async (providerId: string) => {
    try {
      const response = await getProviderById(providerId);
      setProvider(response);
      setErrorMessage('');
    } catch (error) {
      console.error('Error when get provider:', error);
      setErrorMessage('Không tìm thấy nhà cung cấp!');
    }
  };

  const onBlur = () => {
    setProvider(undefined);
    fetchProviderById(watch('provider-id') + '');
  };

  return (
    <div className="add-import-food-component">
      <form className="add-import-food-body" onSubmit={handleSubmit(onSubmit)}>
        <AdminContainerComponent
          title='Thông tin phiếu nhập'
          className="info-container"
          extraTitle={
            <div className="save-close">
              <ButtonComponent
                label='Lưu'
                type="submit"
                className="save-btn"
                variant="primary"
                isDisabled={errorMessage.length > 0 || (watch('provider-id') + '').length === 0}
              />
              <div className="close-btn">
                <IoClose size={28} className="close-icon" onClick={() => {
                  setIsShowAdd(false);
                  hideOverlay();
                  reset();
                  setProvider(undefined);
                  setErrorMessage('');
                }} />
              </div>
            </div>
          }
          children={
            <div className="import-receipt-info">
              <InputComponent
                name="provider-id"
                register={register}
                title="Mã nhà cung cấp"
                placeholder="Nhập mã nhà cung cấp"
                isRequired
                onBlur={onBlur}
              />
              {errorMessage.length > 0 && (
                <ErrorMessage message={errorMessage} styles={{ marginTop: '-12px' }} />
              )}
              {provider && (
                <div className="provider-info">
                  <InputComponent
                    name="provider-name"
                    title="Tên nhà cung cấp"
                    placeholder={provider.tenNhaCungCap}
                    isReadOnly
                  />
                  <InputComponent
                    name="founded-date"
                    title="Ngày thành lập"
                    placeholder={dateFormatter.format(new Date(provider.ngayThanhLap))}
                    isReadOnly
                  />
                  <InputComponent
                    name="provider-name"
                    title="Địa chỉ nhà cung cấp"
                    placeholder={provider.diaChi}
                    isReadOnly
                  />
                </div>
              )}
              <InputComponent
                name="import-receipt-note"
                register={register}
                title="Ghi chú (nếu có)"
                placeholder="Nhập ghi chú"
                isTextarea
              />
            </div>
          }
        />
      </form>
    </div>
  );
};

export default AddImportFood;
