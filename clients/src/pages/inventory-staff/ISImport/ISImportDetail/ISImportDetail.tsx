import { deleteImportReceiptProduct, getImportReceiptById, requestApproveImportReceipt } from "@/api/importReceiptApi";
import { AdminContainerComponent, BackComponent, ButtonComponent, InfoItemComponent, OkCancelModal } from "@/components";
import webColors from "@/constants/webColors";
import { overlayStore } from "@/store";
import { ImportReceiptDetailType, ImportReceiptStatus } from "@/types/ImportReceipt";
import { datetimeFormatter } from "@/utils/datetimeFormatter";
import SeparateNumber from "@/utils/separateNumber";
import { useEffect, useState } from "react";
import { IoCreate, IoTrashSharp } from "react-icons/io5";
import ISAddProduct from "./ISAddProduct/ISAddProduct";
import './ISImportDetail.scss';
import ISEditProduct from "./ISEditProduct/ISEditProduct";

interface IProps {
  setIsShowDetail: React.Dispatch<React.SetStateAction<boolean>>;
  detailData: ImportReceiptDetailType | undefined;
  onFinish: () => void;
}

const headers = ['Mã thực phẩm', 'Tên thực phẩm', 'Ngày sản xuất', 'Hạn sử dụng', 'Đơn giá nhập', 'Số lượng', 'Đơn vị tính', 'Hành động'];

const ISImportDetail = (props: IProps) => {
  const { setIsShowDetail, detailData, onFinish } = props;
  const [isShowConfirmDelete, setIsShowConfirmDelete] = useState(false);
  const [isShowConfirmFinish, setIsShowConfirmFinish] = useState(false);
  const [selectedData, setSelectedData] = useState<ImportReceiptDetailType['danhSachThucPham'][number]>();
  const [isShowAddProduct, setIsShowAddProduct] = useState(false);
  const [isShowEditProduct, setIsShowEditProduct] = useState(false);
  const [importProducts, setImportProducts] = useState<ImportReceiptDetailType['danhSachThucPham']>([]);
  const { showOverlay, hideOverlay } = overlayStore();

  useEffect(() => {
    fetchImportProducts();
  }, []);

  const fetchImportProducts = async () => {
    try {
      if (detailData) {
        const response = await getImportReceiptById(detailData.maPhieuNhap);
        setImportProducts(response.danhSachThucPham);
      }
    } catch (error) {
      console.error('Error when get products:', error);
    }
  };

  const handleDeleteProduct = async (productPackageId: string) => {
    try {
      const response = await deleteImportReceiptProduct(productPackageId);
      console.log('Delete result:', response);
    } catch (error) {
      console.log('Error when delete product:', error);
    }
  };

  return (
    <>
      {detailData && (
        <div className="import-food-detail-component">
          <div className="import-food-detail-header">
            <BackComponent
              backTitle="Quay lại danh sách phiếu nhập"
              onBack={() => { setIsShowDetail(false); }}
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
              <div className="receipt-products-header">
                <span className="receipt-products-title">Danh sách thực phẩm cung cấp</span>
                {detailData.trangThai === 3 && (
                  <ButtonComponent
                    className="btn-add-product"
                    type="no-submit"
                    label="Thêm thực phẩm"
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
                  {importProducts?.map((product, idx) => (
                    <tr key={idx} className="tb-body-row">
                      <td style={{ padding: '10px 0 10px 20px', textAlign: 'justify' }}>
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
                      <td>
                        <div className="edit-delete">
                          <IoCreate
                            size={22}
                            color={webColors.adminPrimary}
                            className="edit-btn"
                            onClick={() => {
                              setSelectedData(product);
                              setIsShowEditProduct(true);
                              showOverlay();
                            }}
                          />
                          <IoTrashSharp
                            size={22}
                            color="red"
                            className="delete-btn"
                            onClick={() => {
                              setSelectedData(product);
                              setIsShowConfirmDelete(true);
                              showOverlay();
                            }}
                          />
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="add-product-modal" style={{ top: isShowAddProduct ? '50%' : '-100%' }}>
            <ISAddProduct
              setIsShowAdd={setIsShowAddProduct}
              onAdded={fetchImportProducts}
              importReceiptId={detailData.maPhieuNhap}
            />
          </div>

          <div className="edit-product-modal" style={{ top: isShowEditProduct ? '50%' : '-100%' }}>
            <ISEditProduct
              setIsShowEdit={setIsShowEditProduct}
              detailData={
                selectedData
                  ? {
                    maLoHang: selectedData.maLoHang ?? '',
                    maThucPham: selectedData.maThucPham ?? '',
                    tenThucPham: selectedData.tenThucPham ?? '',
                    ngaySanXuat: selectedData.ngaySanXuat ?? '',
                    hanSuDung: selectedData.hanSuDung ?? '',
                    donGiaNhap: selectedData.donGiaNhap ?? 0,
                    soLuong: selectedData.soLuong ?? 0,
                    donViTinh: selectedData.donViTinh ?? '',
                    maPhieuNhap: detailData.maPhieuNhap
                  }
                  : undefined
              }
              onEdit={fetchImportProducts}
            />
          </div>

          <div className="ok-cancel-delete" style={{ top: isShowConfirmDelete ? '50%' : '-100%' }}>
            <OkCancelModal
              data={{
                message: <p>Bạn chắc chắn muốn <b style={{ color: 'red' }}>xóa</b> thực phẩm <b>{selectedData?.tenThucPham}</b> khỏi phiếu nhập chứ?</p>
              }}
              onOk={async () => {
                handleDeleteProduct(selectedData?.maLoHang + '');
                setIsShowConfirmDelete(false);
                fetchImportProducts();
                hideOverlay();
              }}
              onCancel={() => {
                setIsShowConfirmDelete(false);
                hideOverlay();
              }}
              onClose={() => {
                setIsShowConfirmDelete(false);
                hideOverlay();
              }}
            />
          </div>

          <div className="ok-cancel-finish" style={{ top: isShowConfirmFinish ? '50%' : '-100%' }}>
            <OkCancelModal
              data={{
                message: <p>Bạn chắc chắn đã <b style={{ color: webColors.primary }}>hoàn thành</b> phiếu nhập này chứ?</p>
              }}
              onOk={async () => {
                const result = await requestApproveImportReceipt(detailData.maPhieuNhap, 'ND002');
                console.log('Result:', result);
                setIsShowConfirmFinish(false);
                setIsShowDetail(false);
                onFinish();
                hideOverlay();
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
        </div>
      )}
    </>
  );
};

export default ISImportDetail;
