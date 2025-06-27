import { updateImportReceiptProduct } from "@/api/importReceiptApi";
import { AdminContainerComponent, ButtonComponent, InputComponent } from "@/components";
import { overlayStore } from "@/store";
import { ImportReceiptDetailType } from "@/types/ImportReceipt";
import { UpdateProductToImportReceiptPayload } from "@/types/ImportReceiptDetail";
import { FormValues } from "@/types/Object";
import { useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { IoClose } from "react-icons/io5";
import './ISEditImportProduct.scss';
import { toast } from "react-toastify";

interface IProps {
  setIsShowEdit: React.Dispatch<React.SetStateAction<boolean>>;
  detailData: ImportReceiptDetailType['danhSachThucPham'][number] & { maPhieuNhap: string; } | undefined;
  onEdit: () => void;
}

const ISEditImportProduct = (props: IProps) => {
  const { setIsShowEdit, onEdit, detailData } = props;
  const [mfg, setMfg] = useState<string>('');
  const [exp, setExp] = useState<string>('');

  const { hideOverlay } = overlayStore();

  const { register, handleSubmit, reset } = useForm<FormValues>();

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    try {
      const payload: UpdateProductToImportReceiptPayload = {
        maPhieuNhap: detailData?.maPhieuNhap + '',
        maThucPham: detailData?.maThucPham + '',
        ngaySanXuat: new Date(data['mfg'] + ''),
        hanSuDung: new Date(data['exp'] + ''),
        donGiaNhap: +data['price'],
        soLuong: +data['quantity']
      };
      const updateResult = await updateImportReceiptProduct(payload, detailData?.maLoHang + '');
      console.log('Update result:', updateResult);
      setIsShowEdit(false);
      hideOverlay();
      onEdit();
      toast.success('Cập nhật thực phẩm thành công!');
    } catch (error) {
      toast.error(`Lỗi: ${error}`);
    }
  };

  useEffect(() => {
    if (detailData) {
      const mfg = new Date(detailData.ngaySanXuat);
      const exp = new Date(detailData.hanSuDung);
      setMfg(`${mfg.getFullYear()}-${mfg.getMonth() + 1 < 10 ? '0' + (mfg.getMonth() + 1) : mfg.getMonth() + 1}-${mfg.getDate() < 10 ? '0' + (mfg.getDate()) : mfg.getDate()}`);
      setExp(`${exp.getFullYear()}-${exp.getMonth() + 1 < 10 ? '0' + (exp.getMonth() + 1) : exp.getMonth() + 1}-${exp.getDate() < 10 ? '0' + (exp.getDate()) : exp.getDate()}`);
    }
  }, [detailData]);

  return (
    <>
      {detailData && (
        <div className="update-import-food-component">
          <form className="update-import-food-body" onSubmit={handleSubmit(onSubmit)}>
            <AdminContainerComponent
              title='Thông tin thực phẩm'
              className="info-container"
              extraTitle={
                <div className="save-close">
                  <ButtonComponent
                    label='Lưu thay đổi'
                    type="submit"
                    className="save-btn"
                    variant="primary"
                  />
                  <div className="close-btn">
                    <IoClose size={28} className="close-icon" onClick={() => {
                      setIsShowEdit(false);
                      hideOverlay();
                      reset();
                    }} />
                  </div>
                </div>
              }
              children={
                <div className="import-food-info">
                  <InputComponent
                    name="product-name"
                    className="product-name"
                    title="Tên thực phẩm"
                    placeholder={detailData.tenThucPham}
                    isReadOnly
                  />
                  <div className="detail-info">
                    <InputComponent
                      name="prd-code"
                      title="Mã thực phẩm"
                      placeholder={detailData.maThucPham}
                      isReadOnly
                    />
                    <InputComponent
                      name="unit"
                      title="Đơn vị tính"
                      placeholder={detailData.donViTinh}
                      isReadOnly
                    />
                  </div>
                  <div className="other-info">
                    <InputComponent
                      name="mfg"
                      register={register}
                      title="Ngày sản xuất"
                      placeholder={mfg}
                      defaultValue
                      type="date"
                      isRequired
                    />
                    <InputComponent
                      name="exp"
                      register={register}
                      title="Hạn sử dụng"
                      placeholder={exp}
                      defaultValue
                      type="date"
                      isRequired
                    />
                    <InputComponent
                      name="price"
                      register={register}
                      title="Đơn giá nhập"
                      placeholder={+detailData.donGiaNhap + ''}
                      defaultValue
                      isRequired
                      suffix={`VND/${detailData ? detailData.donViTinh : ''}`}
                    />
                    <InputComponent
                      name="quantity"
                      register={register}
                      title="Số lượng"
                      placeholder={detailData.soLuong + ''}
                      defaultValue
                      isRequired
                      suffix={detailData ? detailData.donViTinh : ''}
                    />
                  </div>
                </div>
              }
            />
          </form>
        </div>
      )}
    </>
  );
};

export default ISEditImportProduct;
