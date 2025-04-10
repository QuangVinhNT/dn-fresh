import { AdminContainerComponent, BackComponent, ButtonComponent, OrderStatusComponent, TableComponent, TextComponent } from "@/components";
import './OrderDetail.scss';
import { IoPrint } from "react-icons/io5";

interface IProps {
  setIsShowDetail: React.Dispatch<React.SetStateAction<boolean>>;
}

const OrderDetail = (props: IProps) => {
  const { setIsShowDetail } = props;
  return (
    <div className="order-detail-component">
      <BackComponent backTitle="Quay lại danh sách đơn hàng" onBack={() => setIsShowDetail(false)} />
      <div className="order-detail-header">
        <div className="order-code-print">
          <TextComponent 
            text="SON12869"
            title
          />
          <ButtonComponent
            className='btn-print'
            label="In đơn hàng"
            type="no-submit"
            affix={<IoPrint className="icn-print" />}
          // onClick={print}
          />
        </div>
        <div className="order-status">
          <OrderStatusComponent status="Xuất kho" time="03/04/2025 10:22" statusItems={['Đặt hàng', 'Đóng gói', 'Xuất kho', 'Hoàn thành']} />
        </div>
      </div>
      <div className="order-detail-body">
        <div className="customer-order">
          <AdminContainerComponent
            className="customer-info-container"
            title='Thông tin khách hàng'
            children={
              <div className="customer-info">
                <div>
                  <span className="title">Mã khách hàng</span>
                  <span className="content">:---</span>
                </div>
                <div>
                  <span className="title">Họ tên khách hàng</span>
                  <span className="content">:---</span>
                </div>
                <div>
                  <span className="title">Giới tính</span>
                  <span className="content">:---</span>
                </div>
                <div>
                  <span className="title">Số điện thoại</span>
                  <span className="content">:---</span>
                </div>
                <div>
                  <span className="title">Email</span>
                  <span className="content">:---</span>
                </div>
                <div>
                  <span className="title">Địa chỉ</span>
                  <span className="content">:---</span>
                </div>
              </div>
            }
          />
          <AdminContainerComponent
            className="order-info-container"
            title='Thông tin đơn hàng'
            children={
              <div className="order-info">
                <div>
                  <span className="title">Trạng thái đơn hàng</span>
                  <span className="content">:---</span>
                </div>
                <div>
                  <span className="title">Mã nhân viên giao hàng</span>
                  <span className="content">:---</span>
                </div>
                <div>
                  <span className="title">Mã nhân viên xuất kho</span>
                  <span className="content">:---</span>
                </div>
                <div>
                  <span className="title">Mã phiếu xuất</span>
                  <span className="content">:---</span>
                </div>
                <div>
                  <span className="title">Địa chỉ nhận hàng</span>
                  <span className="content">:---</span>
                </div>
                <div>
                  <span className="title">Ngày tạo đơn</span>
                  <span className="content">:---</span>
                </div>
                <div>
                  <span className="title">Giá trị đơn hàng</span>
                  <span className="content">:---</span>
                </div>
              </div>
            }
          />
        </div>
        <div className="food-note">
          <AdminContainerComponent
            className="note-info-container"
            title='Ghi chú'
            children={
              <ol>
                <li>abc</li>
                <li>abc</li>
                <li>abc</li>
                <li>abc</li>
                <li>abc</li>
              </ol>
            }
          />
          <AdminContainerComponent
            className="food-info-container"
            title='Thông tin thực phẩm'
            children={
              <div className="food-info">
                <TableComponent
                  headers={['Mã thực phẩm', 'Tên thực phẩm', 'Số lượng', 'Đơn vị tính']}
                  data={[
                    {
                      foodCode: 'FD001',
                      foodName: 'Cà chua bi',
                      quantity: '1',
                      unit: 'kg'
                    },
                    {
                      foodCode: 'FD001',
                      foodName: 'Cà chua bi',
                      quantity: '1',
                      unit: 'kg'
                    },
                    {
                      foodCode: 'FD001',
                      foodName: 'Cà chua bi',
                      quantity: '1',
                      unit: 'kg'
                    },
                    {
                      foodCode: 'FD001',
                      foodName: 'Cà chua bi',
                      quantity: '1',
                      unit: 'kg'
                    },
                    {
                      foodCode: 'FD001',
                      foodName: 'Cà chua bi',
                      quantity: '1',
                      unit: 'kg'
                    }
                  ]}
                />
              </div>
            }
          />
        </div>
      </div>
    </div>
  );
};

export default OrderDetail;
