import { AdminContainerComponent, BackComponent, ButtonComponent, InputComponent, OkCancelModal } from "@/components";
import './EditExportFood.scss';
import { ExportReceiptDetailType, UpdateExportReceiptPayload } from "@/types/ExportReceipt";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { FormValues } from "@/types/Object";
import { overlayStore } from "@/store";
import { updateExportReceipt } from "@/api/exportReceiptApi";
import { datetimeFormatter } from "@/utils/datetimeFormatter";
import webColors from "@/constants/webColors";

interface IProps {
  setIsShowDetail: React.Dispatch<React.SetStateAction<boolean>>;
  setIsShowEdit: React.Dispatch<React.SetStateAction<boolean>>;
  data: ExportReceiptDetailType | undefined;
  onEdited: () => void;
}

const EditExportFood = (props: IProps) => {
  const { setIsShowDetail, setIsShowEdit, data, onEdited } = props;
  const [isShowOkCancel, setIsShowOkCancel] = useState(false);

  const { register, reset, handleSubmit } = useForm<FormValues>();
  const { showOverlay, hideOverlay } = overlayStore();

  const onSubmit: SubmitHandler<FormValues> = async (formData) => {
    const payload: UpdateExportReceiptPayload = {
      maQuanTriVien: 'ND001',
      ghiChu: formData['note'].toString()
    };
    const updateResult = await updateExportReceipt(payload, data?.maPhieuXuat + '');
    console.log('Update result:', updateResult);
    setIsShowEdit(false);
    setIsShowDetail(false);
    reset();
    onEdited();
    hideOverlay();
  };

  return (
    <form className="edit-export-food-component" onSubmit={handleSubmit(onSubmit)}>
      <div className="edit-export-food-header">
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
          />
        </div>
      </div>
      {data && (
        <div className="edit-export-food-body">
          <AdminContainerComponent
            title='Thông tin phiếu xuất'
            children={
              <div className="export-receipt-info">
                <InputComponent
                  name="id-code"
                  title="Mã phiếu xuất"
                  placeholder={data.maPhieuXuat}
                  isReadOnly
                />
                <InputComponent
                  name="create-date"
                  title="Ngày tạo"
                  placeholder={datetimeFormatter(data.ngayTao + '')}
                />
                <InputComponent
                  name="note"
                  title="Ghi chú"
                  placeholder={data.ghiChu}
                  defaultValue
                  isRequired
                  isTextarea
                  register={register}
                  styles={{ gridColumn: 'span 2' }}
                />
              </div>
            }
          />
        </div>
      )}
      <div className="ok-cancel-modal" style={{ top: isShowOkCancel ? '50%' : '-100%' }}>
        <OkCancelModal
          data={{
            message: <p>Bạn chắn chắn muốn <b style={{ color: webColors.adminPrimary }}>lưu</b> những thay đổi cho phiếu xuất <b>{data?.maPhieuXuat}</b> chứ?</p>
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

export default EditExportFood;
