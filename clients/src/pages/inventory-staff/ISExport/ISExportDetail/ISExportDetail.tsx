import { deleteAllProductFromExportReceipt, getExportReceiptById, requestApproveExportReceipt } from "@/api/exportReceiptApi";
import { getReadyOrders, unpackOrders } from "@/api/orderApi";
import { AdminContainerComponent, BackComponent, ButtonComponent, InfoItemComponent, OkCancelModal } from "@/components";
import webColors from "@/constants/webColors";
import { overlayStore, userStore } from "@/store";
import { ExportReceiptDetailType, ExportReceiptStatus } from "@/types/ExportReceipt";
import { ReadyOrder } from "@/types/Order";
import { datetimeFormatter } from "@/utils/datetimeFormatter";
import { useEffect, useState } from "react";
import ISAddExportProduct from "./ISAddExportProduct/ISAddExportProduct";
import './ISExportDetail.scss';
import { toast } from "react-toastify";

interface IProps {
  setIsShowDetail: React.Dispatch<React.SetStateAction<boolean>>;
  detailData: ExportReceiptDetailType | undefined;
  onFinish: () => void;
}

const headers = ['Mã lô hàng', 'Mã thực phẩm', 'Tên thực phẩm', 'Số lượng', 'Đơn vị tính'];

const ISExportDetail = (props: IProps) => {
  const { setIsShowDetail, detailData, onFinish } = props;
  const [isShowConfirmFinish, setIsShowConfirmFinish] = useState(false);
  const [isShowAddProduct, setIsShowAddProduct] = useState(false);
  const [exportProducts, setExportProducts] = useState<ExportReceiptDetailType['danhSachThucPham']>([]);
  const [readyOrders, setReadyOrders] = useState<ReadyOrder[]>();
  const { showOverlay, hideOverlay } = overlayStore();
  const { user } = userStore();

  useEffect(() => {
    fetchExportProducts();
    fetchReadyExportOrders();
  }, []);

  const fetchExportProducts = async () => {
    try {
      if (detailData) {
        const response = await getExportReceiptById(detailData.maPhieuXuat);
        setExportProducts(response.danhSachThucPham);
      }
    } catch (error) {
      console.error('Error when get products:', error);
    }
  };

  const fetchReadyExportOrders = async () => {
    try {
      const respone = await getReadyOrders();
      setReadyOrders(respone);
    } catch (error) {
      console.error('Error when get orders:', error);
    }
  };

  return (
    <>
      {detailData && (
        <>
          <div className="export-food-detail-component">
            <div className="export-food-detail-header">
              <BackComponent
                backTitle="Quay lại danh sách phiếu nhập"
                onBack={async () => {
                  setIsShowDetail(false);
                  await deleteAllProductFromExportReceipt(detailData.maPhieuXuat);
                  await unpackOrders(detailData.maPhieuXuat);
                  fetchReadyExportOrders();
                  fetchExportProducts();
                  window.location.reload();
                }}
              />
              {detailData.trangThai === 3 && (
                <ButtonComponent
                  label="Hoàn thành"
                  type="no-submit"
                  variant="secondary"
                  onClick={() => {
                    setIsShowConfirmFinish(true);
                    showOverlay();
                  }}
                />
              )}
            </div>
            <div className="export-food-detail-body">
              <div className="info-note-receipt">
                <AdminContainerComponent
                  title='Thông tin phiếu xuất'
                  className="info-container"
                  children={
                    <div className="receipt-info">
                      <InfoItemComponent
                        title="Mã phiếu xuất:"
                        content={detailData.maPhieuXuat}
                      />
                      <InfoItemComponent
                        title="Trạng thái:"
                        content={ExportReceiptStatus[detailData.trangThai]}
                      />
                      <InfoItemComponent
                        title="Mã nhân viên xuất:"
                        content={detailData.maNhanVien || 'Chưa xuất hàng'}
                      />
                      <InfoItemComponent
                        title="Tên nhân viên xuất:"
                        content={detailData.tenNhanVien || 'Chưa xuất hàng'}
                      />
                      <InfoItemComponent
                        title="Mã quản trị viên:"
                        content={detailData.maQuanTriVien}
                      />
                      <InfoItemComponent
                        title="Tên quản trị viên:"
                        content={detailData.tenQuanTriVien}
                      />
                      <InfoItemComponent
                        title="Ngày tạo:"
                        content={datetimeFormatter(detailData.ngayTao + '')}
                      />
                      <InfoItemComponent
                        title="Ngày xuất hàng:"
                        content={detailData.ngayXuatHang ? datetimeFormatter(detailData.ngayXuatHang + '') : 'Chưa xuất hàng'}
                      />
                      <InfoItemComponent
                        title="Ngày cập nhật:"
                        content={datetimeFormatter(detailData.ngayCapNhat + '')}
                      />
                    </div>
                  }
                />
                <AdminContainerComponent
                  title='Ghi chú'
                  className="note-container"
                  children={
                    <div className="receipt-note">
                      <p>{detailData.ghiChu}</p>
                    </div>
                  }
                />
              </div>
              <div className="receipt-products">
                <div className="receipt-products-header">
                  <span className="receipt-products-title">Danh sách thực phẩm xuất kho</span>
                  {detailData.trangThai === 3 && (
                    <ButtonComponent
                      className="btn-add-product"
                      type="no-submit"
                      label="Xem danh sách đơn hàng"
                      variant="primary"
                      onClick={() => {
                        setIsShowAddProduct(true);
                        showOverlay();
                      }}
                    />
                  )}
                </div>
                <table className="table">
                  <thead>
                    <tr className="tb-header-row">
                      {headers.map((value, index) => (
                        <th key={index} className="table-data">
                          {value}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {exportProducts?.map((product, idx) => (
                      <tr key={idx} className="tb-body-row">
                        <td style={{ padding: '10px 0 10px 20px', textAlign: 'justify' }}>
                          <span>{product.maLoHang}</span>
                        </td>
                        <td>
                          <span>{product.maThucPham}</span>
                        </td>
                        <td>
                          <span>{product.tenThucPham}</span>
                        </td>
                        <td>
                          <span>{product.soLuong}</span>
                        </td>
                        <td>
                          <span>{product.donViTinh}</span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
          <div className="add-product-modal" style={{ top: isShowAddProduct ? '50%' : '-100%' }}>
            <ISAddExportProduct
              setIsShowAdd={setIsShowAddProduct}
              onAdded={fetchExportProducts}
              exportReceiptId={detailData.maPhieuXuat}
              readyOrders={readyOrders}
            />
          </div>
          <div className="ok-cancel-finish" style={{ top: isShowConfirmFinish ? '50%' : '-100%' }}>
            <OkCancelModal
              data={{
                message: <p>Bạn chắc chắn đã <b style={{ color: webColors.primary }}>hoàn thành</b> phiếu nhập này chứ?</p>
              }}
              onOk={async () => {
                try {
                  const result = await requestApproveExportReceipt(detailData.maPhieuXuat, user?.id + '');
                  console.log('Result:', result);
                  setIsShowConfirmFinish(false);
                  setIsShowDetail(false);
                  onFinish();
                  hideOverlay();
                  toast.success('Xác nhận hoàn thành phiếu nhập thành công!');
                } catch (error) {
                  toast.error(`Lỗi: ${error}`);
                }
              }}
              onCancel={() => {
                setIsShowConfirmFinish(false);
                hideOverlay();
              }}
              onClose={() => {
                setIsShowConfirmFinish(false);
                hideOverlay();
              }}
            />
          </div>
        </>
      )}
    </>
  );
};

export default ISExportDetail;
