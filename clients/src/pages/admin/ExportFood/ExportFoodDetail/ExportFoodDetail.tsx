import { AdminContainerComponent, BackComponent, ButtonComponent, InfoItemComponent, OkCancelModal, TableComponent } from "@/components";
import './ExportFoodDetail.scss';
import { ExportReceiptDetailType, ExportReceiptStatus } from "@/types/ExportReceipt";
import { useState } from "react";
import { overlayStore } from "@/store";
import { datetimeFormatter } from "@/utils/datetimeFormatter";
import { approveExportReceipt, softDeleteExportReceipt } from "@/api/exportReceiptApi";

interface IProps {
  setIsShowDetail: React.Dispatch<React.SetStateAction<boolean>>;
  setIsShowEdit: React.Dispatch<React.SetStateAction<boolean>>;
  detailData: ExportReceiptDetailType | undefined;
  onSoftDeleted: () => void;
}

const headers = ['Mã lô hàng', 'Mã thực phẩm', 'Tên thực phẩm', 'Số lượng', 'Đơn vị tính'];

const ExportFoodDetail = (props: IProps) => {
  const { setIsShowDetail, setIsShowEdit, detailData, onSoftDeleted } = props;
  const [isShowOkCancel, setIsShowOkCancel] = useState(false);
  const { showOverlay, hideOverlay } = overlayStore();
  return (
    <>
      {detailData && (
        <div className="export-food-detail-component">
          <div className="export-food-detail-header">
            <BackComponent
              backTitle="Quay lại danh sách phiếu xuất"
              onBack={() => { setIsShowDetail(false); }}
            />
            <div className="delete-edit-approve">
              <ButtonComponent
                className="btn-delete"
                type="no-submit"
                label="Hủy phiếu xuất"
                variant="danger"
                onClick={() => {
                  setIsShowOkCancel(true);
                  showOverlay();
                }}
              />
              <ButtonComponent
                className="btn-edit"
                type="no-submit"
                label="Sửa phiếu xuất"
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
                  label='Duyệt phiếu xuất'
                  variant="secondary"
                />
              )}
            </div>
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
              <span className="receipt-products-header">Danh sách thực phẩm xuất</span>
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
          <div className="ok-cancel-modal" style={{ top: isShowOkCancel ? '50%' : '-100%' }}>
            <OkCancelModal
              data={{
                message: <p>Bạn chắc chắn muốn <b style={{ color: 'red' }}>hủy</b> phiếu xuất <b>{detailData.maPhieuXuat}</b> chứ?</p>
              }}
              onOk={async () => {
                console.log(detailData.maPhieuXuat, detailData.maQuanTriVien)
                const softDeleteResult = await softDeleteExportReceipt(detailData.maPhieuXuat, detailData.maQuanTriVien);
                console.log('Cancel result:', softDeleteResult);
                setIsShowDetail(false);
                setIsShowOkCancel(false);
                onSoftDeleted();
                hideOverlay();
              }}
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
        </div>
      )}
    </>
  );
};

export default ExportFoodDetail;
