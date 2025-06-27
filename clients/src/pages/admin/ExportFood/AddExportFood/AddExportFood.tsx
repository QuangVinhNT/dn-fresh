import { insertExportReceipt } from "@/api/exportReceiptApi";
import { AdminContainerComponent, ButtonComponent, InputComponent } from "@/components";
import { overlayStore, userStore } from "@/store";
import { InsertExportReceiptPayload } from "@/types/ExportReceipt";
import { FormValues } from "@/types/Object";
import { SubmitHandler, useForm } from "react-hook-form";
import { IoClose } from "react-icons/io5";
import { toast } from "react-toastify";
import './AddExportFood.scss';

interface IProps {
  setIsShowAdd: React.Dispatch<React.SetStateAction<boolean>>;
  onAdded: () => void;
}

const AddExportFood = (props: IProps) => {
  const { setIsShowAdd, onAdded } = props;
  const { user } = userStore();

  const { hideOverlay } = overlayStore();

  const { register, reset, handleSubmit } = useForm<FormValues>();

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    try {
      const payload: InsertExportReceiptPayload = {
        maQuanTriVien: user?.id + '',
        ghiChu: data['note'].toString()
      };
      const insertResult = await insertExportReceipt(payload);
      console.log('Insert result:', insertResult);
      setIsShowAdd(false);
      hideOverlay();
      reset();
      onAdded();
      toast.success('Tạo phiếu xuất thành công!');
    } catch (error) {
      toast.error(`Lỗi: ${error}`);
    }
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
