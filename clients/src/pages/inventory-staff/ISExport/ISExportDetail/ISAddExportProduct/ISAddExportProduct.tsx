import { deleteAllProductFromExportReceipt, insertProductToExportReceipt } from "@/api/exportReceiptApi";
import { getByIdForExport } from "@/api/importReceiptApi";
import { AdminContainerComponent, ButtonComponent } from "@/components";
import { overlayStore } from "@/store";
import { InsertProductToExportReceiptPayload } from "@/types/ExportReceipt";
import { FormValues } from "@/types/Object";
import { ReadyOrder } from "@/types/Order";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { IoClose } from "react-icons/io5";
import './ISAddExportProduct.scss';
import { confirmPackOrder, unpackOrders } from "@/api/orderApi";
import { toast } from "react-toastify";

interface IProps {
  setIsShowAdd: React.Dispatch<React.SetStateAction<boolean>>;
  exportReceiptId: string;
  onAdded: () => void;
  readyOrders: ReadyOrder[] | undefined;
}

const ISAddExportProduct = (props: IProps) => {
  const { setIsShowAdd, onAdded, exportReceiptId, readyOrders } = props;

  const { control, setValue, watch, handleSubmit } = useForm<FormValues>();

  const selectedItems = watch('orders') as string[];
  const isAllChecked = selectedItems?.length === readyOrders?.length;

  const handleToggleAll = () => {
    if (isAllChecked && readyOrders) {
      setValue('orders', []);
    } else {
      setValue('orders', readyOrders ? readyOrders.map((readyOrder) => readyOrder.maDonHang) : []);
    }
  };

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    try {
      const deleteAllResult = await deleteAllProductFromExportReceipt(exportReceiptId);
      const unpackAllResult = await unpackOrders(exportReceiptId);
      // console.log('Unpack result:', unpackAllResult);

      const chooseOrders = readyOrders?.filter(readyOrder => (data['orders'] as string[]).includes(readyOrder.maDonHang)) || [];

      const mergedOrders = new Map();
      for (const order of chooseOrders) {
        const packResult = await confirmPackOrder(order.maDonHang, exportReceiptId);
        // console.log('Pack result', packResult);
        for (const item of order.danhSachThucPham) {
          const existing = mergedOrders.get(item.maThucPham);
          if (existing) {
            existing.soLuong += item.soLuong;
          } else {
            mergedOrders.set(item.maThucPham, { ...item });
          }
        }
      }

      const products = Array.from(mergedOrders.values());
      const exportProducts: any[] = [];
      for (const product of products) {
        const readyProducts = await getByIdForExport(product.maThucPham);
        let productQuantity = +product.soLuong;
        if (readyProducts?.length > 0) {
          for (const readyProduct of readyProducts) {
            if (productQuantity >= readyProduct.soLuong) {
              exportProducts.push(readyProduct);
              productQuantity -= readyProduct.soLuong;
            } else {
              exportProducts.push({ ...readyProduct, soLuong: productQuantity });
              productQuantity = 0;
              break;
            }
          }
        } else {
          console.error('Hết hàng');
        }
      }

      for (const product of exportProducts) {
        const payload: InsertProductToExportReceiptPayload = {
          maLoHang: product.maLoHang,
          maThucPham: product.maThucPham,
          soLuong: product.soLuong
        };
        const insertResult = await insertProductToExportReceipt(exportReceiptId, payload);
      }

      onAdded();
      hideOverlay();
      setIsShowAdd(false);
      toast.success('Cập nhật thực phẩm trong phiếu xuất thành công!')
    } catch (error) {
      toast.error(`Lỗi: ${error}`);
    }
  };

  const { hideOverlay } = overlayStore();
  return (
    <div className="add-export-food-component">
      <form className="add-export-food-body" onSubmit={handleSubmit(onSubmit)}>
        <AdminContainerComponent
          title='Danh sách đơn hàng được đặt (chưa đóng gói)'
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
                }} />
              </div>
            </div>
          }
          children={
            <div className="ready-orders">
              <div className="orders-title">
                <h4>Chọn đơn hàng đóng gói:</h4>
                <span
                  onClick={handleToggleAll}
                >{isAllChecked ? 'Bỏ chọn tất cả' : 'Chọn tất cả'}</span>
              </div>
              <div className="orders">
                {readyOrders?.map((readyOrder, idx) => (
                  <div className="order" key={idx}>
                    <details className="order-info">
                      <summary className="order-code" title="Xem chi tiết">{readyOrder.maDonHang}</summary>
                      <ul>
                        {readyOrder.danhSachThucPham.map((product, idx) => (
                          <li key={idx}>{product.tenThucPham}: {product.soLuong} {product.donViTinh}</li>
                        ))}
                      </ul>
                    </details>

                    <Controller
                      name="orders"
                      control={control}
                      render={({ field }) => {
                        const value = (field.value as string[]) ?? [];
                        const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
                          const checked = e.target.checked;
                          const updated = checked ? [...value, readyOrder.maDonHang] : value.filter((i) => i !== readyOrder.maDonHang);
                          field.onChange(updated);
                        };
                        return (
                          <input
                            type="checkbox"
                            value={readyOrder.maDonHang}
                            checked={value?.includes(readyOrder.maDonHang)}
                            onChange={onChange}
                          />
                        );
                      }}
                    />
                  </div>
                ))}
              </div>
            </div>
          }
        />
      </form>
    </div>
  );
};

export default ISAddExportProduct;
