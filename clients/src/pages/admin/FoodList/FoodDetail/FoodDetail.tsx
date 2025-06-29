import { deleteProduct } from "@/api/productApi";
import { AdminContainerComponent, BackComponent, ButtonComponent, ImageSlider, OkCancelModal, TextComponent } from "@/components";
import { overlayStore } from "@/store";
import { AdminProductDetail, ProductPackage, ProductStatus } from "@/types/Product";
import { datetimeFormatter } from "@/utils/datetimeFormatter";
import { useState } from "react";
import { toast } from "react-toastify";
import './FoodDetail.scss';

interface IProps {
  setIsShowDetail: React.Dispatch<React.SetStateAction<boolean>>;
  setIsShowEditFood: React.Dispatch<React.SetStateAction<boolean>>;
  detailData: AdminProductDetail | undefined;
  packageData: ProductPackage[] | undefined;
  onDelete?: () => void;
}

const statusClass = ['no-trading', 'trading', 'out-of-stock'];
const headers = ['Mã lô hàng', 'Số lượng tồn kho', 'Đơn vị tính', 'Hạn sử dụng', 'Nhà cung cấp'];

const FoodDetail = (props: IProps) => {
  const { setIsShowDetail, detailData, setIsShowEditFood, packageData, onDelete } = props;
  const [isShowDeleteModal, setIsShowDeleteModal] = useState(false);
  const { hideOverlay, showOverlay } = overlayStore();
  return (
    <>
      {detailData && (
        <div className="food-detail-component">
          <BackComponent onBack={() => {
            setIsShowDetail(false);
            window.location.reload();
          }} backTitle="Quay lại danh sách sản phẩm" />
          <TextComponent
            text={detailData.tenThucPham ?? "Chưa có dữ liệu"}
            title
          />
          <AdminContainerComponent
            className="food-info"
            title={
              <div className="food-info-header">
                <span className="title">Thông tin chung</span>
                <span className={`status ${statusClass[detailData.trangThai]}`} style={{}}>{ProductStatus[detailData.trangThai]}</span>
              </div>
            }
            extraTitle={
              <div className="delete-edit">
                <ButtonComponent
                  className="btn-delete"
                  label="Xóa thực phẩm"
                  onClick={() => {
                    setIsShowDeleteModal(true);
                    showOverlay();
                  }}
                  variant="danger"
                  type="no-submit"
                />
                <ButtonComponent
                  className="btn-edit"
                  label="Sửa thực phẩm"
                  onClick={() => {
                    setIsShowEditFood(true);
                    setIsShowDetail(false);
                  }}
                  type="no-submit"
                  variant="primary"
                />
              </div>
            }
            children={
              detailData && (
                <div className="food-info-body">
                  <div className="content">
                    <div>
                      <span className="title">Mã thực phẩm</span>
                      <span className="detail">: {detailData.maThucPham}</span>
                    </div>
                    <div>
                      <span className="title">Tên thực phẩm</span>
                      <span className="detail">: {detailData.tenThucPham}</span>
                    </div>
                    <div>
                      <span className="title">Giá bán</span>
                      <span className="detail">: {detailData.donGia}</span>
                    </div>
                    <div>
                      <span className="title">Loại thực phẩm</span>
                      <span className="detail">: {detailData.tenDanhMuc}</span>
                    </div>
                    <div>
                      <span className="title">Số lượng tồn kho</span>
                      <span className="detail">: {detailData.soLuongTonKho}</span>
                    </div>
                    <div>
                      <span className="title">Đơn vị tính</span>
                      <span className="detail">: {detailData.donViTinh}</span>
                    </div>
                    <div>
                      <span className="title">Ngày tạo</span>
                      <span className="detail">: {datetimeFormatter(detailData.ngayTao + '')}</span>
                    </div>
                    <div>
                      <span className="title">Ngày cập nhật cuối</span>
                      <span className="detail">: {datetimeFormatter(detailData.ngayCapNhat + '')}</span>
                    </div>
                  </div>
                  <div className="image">
                    <ImageSlider images={detailData.hinhAnh} />
                  </div>
                </div>
              )
            }
          />

          <AdminContainerComponent
            title="Mô tả"
            className="food-desc"
            children={
              <p>
                {detailData?.moTa ?? "Chưa có mô tả cho thực phẩm này."}
              </p>
            }
          />

          <div className="package-detail">
            <span className="package-detail-header">Chi tiết thực phẩm - lô hàng</span>
            <div className="package-detail-body">
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
                  {packageData?.map((productPackage, idx) => (
                    <tr key={idx} className="tb-body-row">
                      <td style={{ padding: '10px 0 10px 20px', textAlign: 'justify' }}>
                        <span>{productPackage.maLoHang}</span>
                      </td>
                      <td>
                        <span>{productPackage.soLuongTonKho}</span>
                      </td>
                      <td>
                        <span>{productPackage.donViTinh}</span>
                      </td>
                      <td>
                        <span>{datetimeFormatter(productPackage.hanSuDung + '')}</span>
                      </td>
                      <td>
                        <span>{productPackage.nhaCungCap}</span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
      {/* Delete modal */}
      <div className="ok-cancel-delete-modal" style={{ top: isShowDeleteModal ? '50%' : '-100%' }}>
        <OkCancelModal
          data={{
            message: <p>Bạn chắc chắn muốn <b style={{ color: 'red' }}>xóa</b> thực phẩm này chứ?</p>
          }}
          onOk={async () => {
            try {
              const deleteResult = await deleteProduct(detailData?.maThucPham ?? '');
              console.log('Delete result:', deleteResult);
              onDelete?.();
              setIsShowDeleteModal(false);
              hideOverlay();
              setIsShowDetail(false);
              toast.success(`Xóa thực phẩm thành công!`);
            } catch (error) {
              toast.error(`Lỗi: ${error}`);
            }
          }}
          onCancel={() => {
            setIsShowDeleteModal(false);
            hideOverlay();
          }}
          onClose={() => {
            setIsShowDeleteModal(false);
            hideOverlay();
          }}
        />
      </div>
    </>
  );
};

export default FoodDetail;
