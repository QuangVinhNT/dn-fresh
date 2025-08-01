import { approveImportReceipt, softDeleteImportReceipt } from "@/api/importReceiptApi";
import { AdminContainerComponent, BackComponent, ButtonComponent, InfoItemComponent, OkCancelModal } from "@/components";
import { overlayStore } from "@/store";
import { ImportReceiptDetailType, ImportReceiptStatus } from "@/types/ImportReceipt";
import { datetimeFormatter } from "@/utils/datetimeFormatter";
import SeparateNumber from "@/utils/separateNumber";
import { useState } from "react";
import './ImportFoodDetail.scss';
import webColors from "@/constants/webColors";
import { toast } from "react-toastify";

interface IProps {
  setIsShowDetail: React.Dispatch<React.SetStateAction<boolean>>;
  setIsShowEdit: React.Dispatch<React.SetStateAction<boolean>>;
  detailData: ImportReceiptDetailType | undefined;
  onUpdated: () => void;
}

const headers = ['Mã lô hàng', 'Mã thực phẩm', 'Tên thực phẩm', 'Ngày sản xuất', 'Hạn sử dụng', 'Đơn giá nhập', 'Số lượng', 'Đơn vị tính'];

const ImportFoodDetail = (props: IProps) => {
  const { setIsShowDetail, setIsShowEdit, detailData, onUpdated } = props;
  const [isShowConfirmCancel, setIsShowConfirmCancel] = useState(false);
  const [isShowConfirmApprove, setIsShowConfirmApprove] = useState(false);
  const { showOverlay, hideOverlay } = overlayStore();

  return (
    <>
      {detailData && (
        <div className="import-food-detail-component">
          <div className="import-food-detail-header">
            <BackComponent
              backTitle="Quay lại danh sách phiếu nhập"
              onBack={() => {
                setIsShowDetail(false);
                window.location.reload();
              }}
            />
            <div className="delete-edit-approve">
              <ButtonComponent
                className="btn-delete"
                type="no-submit"
                label="Hủy phiếu nhập"
                variant="danger"
                onClick={() => {
                  setIsShowConfirmCancel(true);
                  showOverlay();
                }}
              />
              <ButtonComponent
                className="btn-edit"
                type="no-submit"
                label="Sửa phiếu nhập"
                variant="primary"
                onClick={() => {
                  setIsShowEdit(true);
                  setIsShowDetail(false);
                }}
              />
              {detailData.danhSachThucPham && detailData.trangThai === 2 && (
                <ButtonComponent
                  className="btn-approve"
                  type="no-submit"
                  label='Duyệt phiếu nhập'
                  variant="secondary"
                  onClick={() => {
                    setIsShowConfirmApprove(true);
                    showOverlay();
                  }}
                />
              )}
            </div>
          </div>
          <div className="import-food-detail-body">
            <div className="info-note-receipt">
              <AdminContainerComponent
                title='Thông tin phiếu nhập'
                className="info-container"
                children={
                  <div className="receipt-info">
                    <InfoItemComponent
                      title="Mã phiếu nhập:"
                      content={detailData.maPhieuNhap}
                    />
                    <InfoItemComponent
                      title="Trạng thái:"
                      content={ImportReceiptStatus[detailData.trangThai]}
                    />
                    <InfoItemComponent
                      title="Mã nhân viên nhập:"
                      content={detailData.maNhanVien || 'Chưa nhập hàng'}
                    />
                    <InfoItemComponent
                      title="Tên nhân viên nhập:"
                      content={detailData.tenNhanVien || 'Chưa nhập hàng'}
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
                      title="Mã nhà cung cấp:"
                      content={detailData.maNhaCungCap}
                    />
                    <InfoItemComponent
                      title="Tên nhà cung cấp:"
                      content={detailData.tenNhaCungCap}
                    />
                    <InfoItemComponent
                      title="Ngày tạo:"
                      content={datetimeFormatter(detailData.ngayTao + '')}
                    />
                    <InfoItemComponent
                      title="Ngày nhập hàng:"
                      content={detailData.ngayNhapHang ? datetimeFormatter(detailData.ngayNhapHang + '') : 'Chưa nhập hàng'}
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
              <span className="receipt-products-header">Danh sách thực phẩm cung cấp</span>
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
                  {detailData.danhSachThucPham?.map((product, idx) => (
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
                        <span>{datetimeFormatter(product.ngaySanXuat)}</span>
                      </td>
                      <td>
                        <span>{datetimeFormatter(product.hanSuDung)}</span>
                      </td>
                      <td>
                        <span>{SeparateNumber(+product.donGiaNhap)} ₫</span>
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
      )}
      <div className="ok-cancel-delete" style={{ top: isShowConfirmCancel ? '50%' : '-100%' }}>
        <OkCancelModal
          data={{
            message: <p>Bạn chắc chắn muốn <b style={{ color: 'red' }}>hủy</b> phiếu nhập <b>{detailData?.maPhieuNhap}</b> chứ?</p>
          }}
          onOk={async () => {
            try {
              const softDeleteResult = await softDeleteImportReceipt(detailData?.maPhieuNhap + '', detailData?.maQuanTriVien + '');
              console.log('Cancel result:', softDeleteResult);
              setIsShowDetail(false);
              setIsShowConfirmCancel(false);
              onUpdated();
              hideOverlay();
              toast.success('Hủy phiếu nhập thành công!');
            } catch (error) {
              toast.error(`Lỗi: ${error}`);
            }
          }}
          onCancel={() => {
            setIsShowConfirmCancel(false);
            hideOverlay();
          }}
          onClose={() => {
            setIsShowConfirmCancel(false);
            hideOverlay();
          }}
        />
      </div>
      <div className="ok-cancel-approve" style={{ top: isShowConfirmApprove ? '50%' : '-100%' }}>
        <OkCancelModal
          data={{
            message: <p>Bạn chắc chắn muốn <b style={{ color: webColors.primary }}>duyệt</b> phiếu nhập <b>{detailData?.maPhieuNhap}</b> chứ?</p>
          }}
          onOk={async () => {
            try {
              const approveResult = await approveImportReceipt(detailData?.maPhieuNhap + '', detailData?.maQuanTriVien + '');
              console.log('Approve result:', approveResult);
              setIsShowDetail(false);
              setIsShowConfirmApprove(false);
              onUpdated();
              hideOverlay();
              toast.success('Duyệt phiếu nhập thành công!');
            } catch (error) {
              toast.error(`Lỗi: ${error}`);
            }
          }}
          onCancel={() => {
            setIsShowConfirmApprove(false);
            hideOverlay();
          }}
          onClose={() => {
            setIsShowConfirmApprove(false);
            hideOverlay();
          }}
        />
      </div>
    </>
  );
};

export default ImportFoodDetail;
