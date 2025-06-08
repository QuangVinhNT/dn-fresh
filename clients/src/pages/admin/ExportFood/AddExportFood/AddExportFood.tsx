import { AdminContainerComponent, BackComponent, ButtonComponent, InputComponent } from "@/components";
import './AddExportFood.scss';
import { useState } from "react";
import { overlayStore } from "@/store";
import { SubmitHandler, useForm } from "react-hook-form";
import { FormValues } from "@/types/Object";
import { InsertExportReceiptPayload } from "@/types/ExportReceipt";
import { insertExportReceipt } from "@/api/exportReceiptApi";
import { IoClose } from "react-icons/io5";

interface IProps {
  setIsShowAdd: React.Dispatch<React.SetStateAction<boolean>>;
  onAdded: () => void;
}

const AddExportFood = (props: IProps) => {
  const { setIsShowAdd, onAdded } = props;
  const [errorMessage, setErrorMessage] = useState<string>('');

  const { hideOverlay } = overlayStore();

  const { register, reset, handleSubmit, watch } = useForm<FormValues>();

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    const payload: InsertExportReceiptPayload = {
      maQuanTriVien: 'ND001',
      ghiChu: data['note'].toString()
    };
    const insertResult = await insertExportReceipt(payload);
    console.log('Insert result:', insertResult);
    setIsShowAdd(false);
    hideOverlay();
    onAdded();
  };

  return (
    <div className="add-export-food-component">
      <form className="add-export-food-body" onSubmit={handleSubmit(onSubmit)}>
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
              />
              <div className="close-btn">
                <IoClose size={28} className="close-icon" onClick={() => {
                  setIsShowAdd(false);
                  hideOverlay();
                  reset();
                }} />
              </div>
            </div>
          }
          children={
            <div className="export-receipt-info">
              <InputComponent
                name="note"
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

export default AddExportFood;
