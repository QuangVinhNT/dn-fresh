import { getOrderById } from "@/api/orderApi";
import PrdImg from '@/assets/images/sp1.png';
import { BackComponent, ClientBanner, OrderStatusComponent } from "@/components";
import { loadingStore } from "@/store";
import { OrderDetail, OrderStatus, PaymentMethod } from "@/types/Order";
import { datetimeFormatter } from "@/utils/datetimeFormatter";
import SeparateNumber from "@/utils/separateNumber";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import './ClientOrderDetail.scss';

const ClientOrderDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [order, setOrder] = useState<OrderDetail>();

  const { showLoading, hideLoading } = loadingStore();

  useEffect(() => {
    fetchOrder();
  }, []);

  const fetchOrder = async () => {
    showLoading();
    try {
      const response = await getOrderById(id as string);
      setOrder(response);
    } catch (error) {
      console.error('Error when load order:', error);
    } finally {
      hideLoading();
    }
  };

  return (
    <>
      {order && (
        <div className="client-order-detail-component">
          <ClientBanner label="Chi tiết đơn hàng" />
          <div className="client-order-detail-content">
            <BackComponent backTitle="Trở về" onBack={() => { navigate(-1); }} />
            <div className="order-status">
              <OrderStatusComponent status={OrderStatus[order.trangThai]} time={datetimeFormatter(order.ngayCapNhat + '')} statusItems={['Đặt hàng', 'Đóng gói', 'Xuất kho', 'Hoàn thành']} />
            </div>
            <div className="order-info-products">
              <div className="order-info">
                <h3>Thông tin đơn hàng</h3>
                <ul>
                  <li><b>Mã đơn hàng:</b> {order.maDonHang}</li>
                  <li><b>Người nhận:</b> {order.nguoiNhan}</li>
                  <li><b>Địa chỉ nhận:</b> {order.diaChiNhan}</li>
                  <li><b>Ngày tạo đơn:</b> {datetimeFormatter(order.ngayTao + '')}</li>
                  <li><b>Phương thức thanh toán:</b> {PaymentMethod[order.phuongThucThanhToan]}</li>
                  <li><b>Ghi chú:</b> {order.ghiChu}</li>
                </ul>
              </div>
              <div className="order-products">
                <h3>Thông tin thực phẩm</h3>
                {order.thongTinThucPham.map((item, idx) => (
                  <div className="prd-item" key={idx} onClick={() => { navigate(`/foods/${item.maThucPham}`); }}>
                    <img src={PrdImg} alt="" />
                    <div className="prd-info">
                      <b>{item.tenThucPham}</b>
                      <span className="prd-cate">Danh mục: {item.tenDanhMuc}</span>
                      <span className="prd-quantity">x{`${item.soLuong} ${item.donViTinh}`}</span>
                    </div>
                    <div className="prd-price">
                      <span className="price">{SeparateNumber(item.giaTien)}₫</span>
                      <span className="pre-discount-price">{SeparateNumber(item.giaTien / (1 - item.tiLeKhuyenMai))}₫</span>
                    </div>
                  </div>
                ))}
                <div className="total-price">
                  <b><span>Tổng tiền: </span>{SeparateNumber(order.tongTien)}₫</b>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ClientOrderDetail;
