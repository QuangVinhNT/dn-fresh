import { AdminContainerComponent, BackComponent, ButtonComponent, ImageSlider, OkCancelModal, TableComponent, TextComponent } from "@/components";
import { overlayStore } from "@/store";
import { useState } from "react";
import './FoodDetail.scss';
import { AdminProductDetail, ProductStatus } from "@/types/Product";
import { datetimeFormatter } from "@/utils/datetimeFormatter";

interface IProps {
  setIsShowDetail: React.Dispatch<React.SetStateAction<boolean>>;
  setIsShowEditFood: React.Dispatch<React.SetStateAction<boolean>>;
  data: AdminProductDetail | undefined;
}

const statusClass = ['no-trading', 'trading', 'out-of-stock']

const FoodDetail = (props: IProps) => {
  const { setIsShowDetail, data, setIsShowEditFood } = props;
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const deleteFood = () => {
    console.log('Delete Food');
    setShowDeleteModal(false);
    hideOverlay();
    setIsShowDetail(false);
  };
  const { hideOverlay, showOverlay } = overlayStore();
  return (
    <>
      {data && (
        <div className="food-detail-component">
          <BackComponent onBack={() => setIsShowDetail(false)} backTitle="Quay lại danh sách sản phẩm" />
          <TextComponent
            text={data.name ?? "Chưa có dữ liệu"}
            title
          />
          <AdminContainerComponent
            className="food-info"
            title={
              <div className="food-info-header">
                <span className="title">Thông tin chung</span>
                <span className={`status ${statusClass[data.status]}`} style={{}}>{ProductStatus[data.status]}</span>
              </div>
            }
            extraTitle={
              <div className="hide-edit">
                <ButtonComponent
                  className="btn-hide"
                  label="Xóa thực phẩm"
                  onClick={() => {
                    setShowDeleteModal(true);
                    showOverlay();
                  }}
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
              data && (
                <div className="food-info-body">
                  <div className="content">
                    <div>
                      <span className="title">Mã thực phẩm</span>
                      <span className="detail">: {data.id}</span>
                    </div>
                    <div>
                      <span className="title">Tên thực phẩm</span>
                      <span className="detail">: {data.name}</span>
                    </div>
                    <div>
                      <span className="title">Giá bán</span>
                      <span className="detail">: {data.price}</span>
                    </div>
                    <div>
                      <span className="title">Loại thực phẩm</span>
                      <span className="detail">: {data.category}</span>
                    </div>
                    <div>
                      <span className="title">Số lượng tồn kho</span>
                      <span className="detail">: {data.quantity}</span>
                    </div>
                    <div>
                      <span className="title">Đơn vị tính</span>
                      <span className="detail">: {data.unit}</span>
                    </div>
                    <div>
                      <span className="title">Ngày tạo</span>
                      <span className="detail">: {datetimeFormatter(data.createdAt)}</span>
                    </div>
                    <div>
                      <span className="title">Ngày cập nhật cuối</span>
                      <span className="detail">: {datetimeFormatter(data.updatedAt)}</span>
                    </div>
                  </div>
                  <div className="image">
                    <ImageSlider images={data.imageUrls} />
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
                {data?.description}
              </p>
            }
          />

          <div className="package-detail">
            <span className="package-detail-header">Chi tiết thực phẩm - lô hàng</span>
            <div className="package-detail-body">
              <TableComponent
                headers={['Mã lô hàng', 'Số lượng tồn kho', 'Đơn vị tính', 'Hạn sử dụng', 'Nhà cung cấp']}
                data={[
                  {
                    packageCode: 'LH0001',
                    quantity: 10,
                    unit: 'kg',
                    expiredDate: '30/03/2025 16:02',
                    provider: 'Hợp tác xã Hòa Vang'
                  },
                  {
                    packageCode: 'LH0002',
                    quantity: 10,
                    unit: 'kg',
                    expiredDate: '30/03/2025 16:02',
                    provider: 'Hợp tác xã Hòa Vang'
                  },
                  {
                    packageCode: 'LH0003',
                    quantity: 10,
                    unit: 'kg',
                    expiredDate: '30/03/2025 16:02',
                    provider: 'Hợp tác xã Hòa Vang'
                  },
                  {
                    packageCode: 'LH0004',
                    quantity: 10,
                    unit: 'kg',
                    expiredDate: '30/03/2025 16:02',
                    provider: 'Hợp tác xã Hòa Vang'
                  },
                  {
                    packageCode: 'LH0005',
                    quantity: 10,
                    unit: 'kg',
                    expiredDate: '30/03/2025 16:02',
                    provider: 'Hợp tác xã Hòa Vang'
                  }
                ]} />
            </div>
          </div>
        </div>
      )}
      {/* Delete modal */}
      {showDeleteModal && (
        <OkCancelModal
          message={
            <p>Bạn chắc chắn muốn xóa sản phẩm {' '}
              <span style={{ fontWeight: 700 }}>{data?.name}</span> ?
            </p>
          }
          onOk={() => {
            deleteFood();
          }}
          onCancel={() => {
            hideOverlay();
            setShowDeleteModal(false);
          }}
        />
      )}
    </>
  );
};

export default FoodDetail;
