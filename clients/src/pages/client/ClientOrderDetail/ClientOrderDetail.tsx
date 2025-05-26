import { BackComponent, ClientBanner, OrderStatusComponent } from "@/components";
import './ClientOrderDetail.scss';
import PrdImg from '@/assets/images/sp1.png';
import SeparateNumber from "@/utils/separateNumber";
import { useNavigate } from "react-router-dom";

const ClientOrderDetail = () => {
  const navigate = useNavigate();
  return (
    <div className="client-order-detail-component">
      <ClientBanner label="Chi tiết đơn hàng" />
      <div className="client-order-detail-content">
        <BackComponent backTitle="Trở về" onBack={() => { navigate('/orders'); }} />
        <div className="order-status">
          <OrderStatusComponent status="Xuất kho" time="03/04/2025 10:22" statusItems={['Đặt hàng', 'Đóng gói', 'Xuất kho', 'Hoàn thành']} />
        </div>
        <div className="order-info-products">
          <div className="order-info">
            <h3>Thông tin đơn hàng</h3>
            <ul>
              <li><b>Mã đơn hàng:</b> ACB</li>
              <li><b>Người nhận:</b> abc</li>
              <li><b>Địa chỉ nhận:</b> abc</li>
              <li><b>Ngày tạo đơn:</b> abc</li>
              <li><b>Phương thức thanh toán:</b> abc</li>
              <li><b>Ghi chú:</b> abc</li>
            </ul>
          </div>
          <div className="order-products">
            <h3>Thông tin thực phẩm</h3>
            {Array.from({ length: 3 }).map((item, idx) => (
              <div className="prd-item">
                <img src={PrdImg} alt="" />
                <div className="prd-info">
                  <b>Tên thực phẩm</b>
                  <span className="prd-cate">Danh mục: {`abc`}</span>
                  <span className="prd-quantity">x{`${10} kg`}</span>
                </div>
                <div className="prd-price">
                  <span className="price">{SeparateNumber(123000)}₫</span>
                  <span className="pre-discount-price">{SeparateNumber(200000)}₫</span>
                </div>
              </div>
            ))}
            <div className="total-price">
              <b><span>Tổng tiền: </span>{SeparateNumber(200000)}₫</b>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ClientOrderDetail;
