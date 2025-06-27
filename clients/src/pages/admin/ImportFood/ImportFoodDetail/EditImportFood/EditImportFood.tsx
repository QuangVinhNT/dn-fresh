import { updateImportReceipt } from "@/api/importReceiptApi";
import { getProviderById } from "@/api/providerApi";
import { AdminContainerComponent, BackComponent, ButtonComponent, ErrorMessage, InputComponent, OkCancelModal } from "@/components";
import { ImportReceiptDetailType, UpdateImportReceiptPayload } from "@/types/ImportReceipt";
import { FormValues } from "@/types/Object";
import { ProviderDetailType } from "@/types/Provider";
import { dateFormatter, datetimeFormatter } from "@/utils/datetimeFormatter";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import './EditImportFood.scss';
import { overlayStore } from "@/store";
import webColors from "@/constants/webColors";
import { toast } from "react-toastify";

interface IProps {
  setIsShowEdit: React.Dispatch<React.SetStateAction<boolean>>;
  setIsShowDetail: React.Dispatch<React.SetStateAction<boolean>>;
  data: ImportReceiptDetailType | undefined;
  onEdited: () => void;
}

const EditImportFood = (props: IProps) => {
  const { setIsShowDetail, setIsShowEdit, data, onEdited } = props;
  const [provider, setProvider] = useState<ProviderDetailType>();
  const [isShowOkCancel, setIsShowOkCancel] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string>('');

  const { register, reset, handleSubmit, watch } = useForm<FormValues>();
  const { showOverlay, hideOverlay } = overlayStore();

  const onSubmit: SubmitHandler<FormValues> = async (formData) => {
    try {
      const payload: UpdateImportReceiptPayload = {
        maNhaCungCap: formData['provider-id'].toString(),
        maQuanTriVien: 'ND001',
        ghiChu: formData['note'].toString()
      };
      const updateResult = await updateImportReceipt(payload, data?.maPhieuNhap + '');
      console.log('Update result:', updateResult);
      setIsShowEdit(false);
      setIsShowDetail(false);
      setErrorMessage('');
      setProvider(undefined);
      reset();
      onEdited();
      hideOverlay();
      toast.success('Cập nhật phiếu nhập thành công!');
    } catch (error) {
      toast.error(`Lỗi: ${error}`);
    }
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
    <form className="edit-import-food-component" onSubmit={handleSubmit(onSubmit)}>
      <div className="edit-import-food-header">
        <BackComponent
          backTitle="Quay lại chi tiết phiếu nhập"
          onBack={() => {
            setIsShowDetail(true);
            setIsShowEdit(false);
          }}
        />
        <div className="cancel-save">
          <ButtonComponent
            className="btn-cancel"
            type="no-submit"
            label="Hủy thay đổi"
            onClick={() => {
              setIsShowEdit(false);
              setIsShowDetail(true);
            }}
          />
          <ButtonComponent
            className="btn-save"
            type="no-submit"
            label="Lưu thay đổi"
            variant="primary"
            onClick={() => {
              setIsShowOkCancel(true);
              showOverlay();
            }}
            isDisabled={errorMessage.length > 0 || (watch('provider-id') + '').length === 0}
          />
        </div>
      </div>
      {data && (
        <div className="edit-import-food-body">
          <AdminContainerComponent
            title='Thông tin phiếu nhập'
            children={
              <div className="import-receipt-info">
                <InputComponent
                  name="id-code"
                  title="Mã phiếu nhập"
                  placeholder={data.maPhieuNhap}
                  isReadOnly
                />
                <InputComponent
                  name="create-date"
                  title="Ngày tạo"
                  placeholder={datetimeFormatter(data.ngayTao + '')}
                />
                <InputComponent
                  name="provider-id"
                  title="Mã nhà cung cấp"
                  placeholder={data.maNhaCungCap}
                  defaultValue
                  isRequired
                  register={register}
                  onBlur={onBlur}
                />
                {errorMessage.length > 0 && (
                  <ErrorMessage message={errorMessage} styles={{ marginTop: '-12px', marginBottom: '-12px', gridColumn: 'span 3', textAlign: 'right' }} />
                )}
                {provider && (
                  <>
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
                  </>
                )}
                <InputComponent
                  name="note"
                  title="Ghi chú"
                  placeholder={data.ghiChu}
                  defaultValue
                  isRequired
                  isTextarea
                  register={register}
                  styles={{ gridColumn: 'span 3' }}
                />
              </div>
            }
          />
        </div>
      )}
      <div className="ok-cancel-modal" style={{ top: isShowOkCancel ? '50%' : '-100%' }}>
        <OkCancelModal
          data={{
            message: <p>Bạn chắn chắn muốn <b style={{ color: webColors.adminPrimary }}>lưu</b> những thay đổi cho phiếu nhập <b>{data?.maPhieuNhap}</b> chứ?</p>
          }}
          onOk={() => { }}
          onCancel={() => {
            setIsShowOkCancel(false);
            hideOverlay();
          }}
          onClose={() => {
            setIsShowOkCancel(false);
            hideOverlay();
          }}
        />
      </div>
    </form>
  );
};

export default EditImportFood;
