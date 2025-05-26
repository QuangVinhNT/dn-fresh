import { ClientBanner, OrderStatusComponent } from "@/components";
import './ClientOrderDetail.scss';
const ClientOrderDetail = () => {
  return (
    <div className="client-order-detail-component">
      <ClientBanner label="Chi tiết đơn hàng" />
      <div className="client-order-detail-content">
        <div className="order-status">
          <span className="order-code">Mã đơn hàng: <b>ACB</b></span>
          <OrderStatusComponent status="Xuất kho" time="03/04/2025 10:22" statusItems={['Đặt hàng', 'Đóng gói', 'Xuất kho', 'Hoàn thành']} />
        </div>
        <div className="order-info">
          <h3>Thông tin đơn hàng</h3>
          <div>
            <span>Người nhận<b>: abc</b></span>
            <span>Địa chỉ nhận<b>: abc</b></span>
            <span>Ngày tạo đơn<b>: abc</b></span>
            <span>Phương thức thanh toán<b>: abc</b></span>
            <span>Ghi chú<b>: abc</b></span>
          </div>
        </div>
        <div className="order-products">

        </div>
      </div>
    </div>
  );
};

export default ClientOrderDetail;
