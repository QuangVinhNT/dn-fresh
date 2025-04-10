import { AdminContainerComponent, BackComponent, ButtonComponent, OkCancelModal, TableComponent, TextComponent } from "@/components";
import { overlayStore } from "@/store";
import { useState } from "react";
import './FoodDetail.scss';

type DataType = {
  name: string,
  image: string,
  type: string,
  brand: string,
  sellable: number,
  warehouse: number,
  createDate: string;
};

interface IProps {
  setIsShowDetail: React.Dispatch<React.SetStateAction<boolean>>;
  setIsShowEditFood: React.Dispatch<React.SetStateAction<boolean>>;
  data: DataType;
}

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
      <div className="food-detail-component">
        <BackComponent onBack={() => setIsShowDetail(false)} backTitle="Quay lại danh sách sản phẩm" />
        <TextComponent 
          text={data.name}
          title
        />
        <AdminContainerComponent
          className="food-info"
          title={
            <div className="food-info-header">
              <span className="title">Thông tin chung</span>
              <span className="status" style={{}}>Đang giao dịch</span>
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
            <div className="food-info-body">
              <div className="content">
                <div>
                  <span className="title">Mã thực phẩm</span>
                  <span className="detail">: ---</span>
                </div>
                <div>
                  <span className="title">Tên thực phẩm</span>
                  <span className="detail">: {data.name}</span>
                </div>
                <div>
                  <span className="title">Giá bán</span>
                  <span className="detail">: ---</span>
                </div>
                <div>
                  <span className="title">Số lượng tồn kho</span>
                  <span className="detail">: ---</span>
                </div>
                <div>
                  <span className="title">Đơn vị tính</span>
                  <span className="detail">: ---</span>
                </div>
                <div>
                  <span className="title">Loại thực phẩm</span>
                  <span className="detail">: ---</span>
                </div>
                <div>
                  <span className="title">Ngày tạo</span>
                  <span className="detail">: ---</span>
                </div>
                <div>
                  <span className="title">Ngày cập nhật cuối</span>
                  <span className="detail">: ---</span>
                </div>
              </div>
              <div className="image">
                <img src={data.image} alt="" />
              </div>
            </div>
          }
        />

        <AdminContainerComponent
          title="Mô tả"
          className="food-desc"
          children={
            <>

            </>
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
      {/* Delete modal */}
      {showDeleteModal && (
        <OkCancelModal
          message={
            <p>Bạn chắc chắn muốn xóa sản phẩm {' '}
              <span style={{ fontWeight: 700 }}>{data.name}</span> ?
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
