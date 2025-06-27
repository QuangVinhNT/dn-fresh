import { confirmCancelOrder, getOrderById } from "@/api/orderApi";
import PrdImg from '@/assets/images/sp1.png';
import { AdminContainerComponent, BackComponent, ButtonComponent, ClientBanner, InputComponent, OrderStatusComponent } from "@/components";
import { loadingStore, overlayStore } from "@/store";
import { OrderDetail, OrderStatus, PaymentMethod } from "@/types/Order";
import { datetimeFormatter } from "@/utils/datetimeFormatter";
import SeparateNumber from "@/utils/separateNumber";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import './ClientOrderDetail.scss';
import { SubmitHandler, useForm } from "react-hook-form";
import { FormValues } from "@/types/Object";
import { toast } from "react-toastify";
import { IoClose } from "react-icons/io5";

const ClientOrderDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [order, setOrder] = useState<OrderDetail>();
  const [isShowNote, setIsShowNote] = useState(false);

  const { showLoading, hideLoading } = loadingStore();
  const { showOverlay, hideOverlay } = overlayStore();

  const { register, reset, handleSubmit } = useForm<FormValues>();
  useEffect(() => {
    fetchOrder();
  }, []);

  const fetchOrder = async () => {
    showLoading();
    try {
      const response = await getOrderById(id as string);
      setOrder(response);
      console.log(response);
    } catch (error) {
      console.error('Error when load order:', error);
    } finally {
      hideLoading();
    }
  };

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    try {
      const payload = {
        maDonHang: order?.maDonHang + '',
        ghiChu: data['note'].toString()
      };
      const cancelResult = await confirmCancelOrder(payload.maDonHang, '', payload.ghiChu);
      console.log('Cancel result:', cancelResult);
      console.log(payload);
      setIsShowNote(false);
      hideOverlay();
      reset();
      toast.success('Hủy đơn hàng thành công!');
      navigate('/orders');
    } catch (error) {
      toast.error(`Lỗi: ${error}`);
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
            {order.trangThai === 1 && (
              (new Date().getTime() - new Date(order.ngayTao + '').getTime()) / (1000 * 60) <= 15
            ) && (
                <ButtonComponent
                  label='Hủy đơn'
                  type="no-submit"
                  variant="danger"
                  className="cancel-btn"
                  onClick={() => {
                    setIsShowNote(true);
                    showOverlay();
                  }}
                />
              )}
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
      <form className="cancel-note-modal" style={{ top: isShowNote ? '50%' : '-100%', width: '50%' }} onSubmit={handleSubmit(onSubmit)}>
        <AdminContainerComponent
          title='Lý do hủy đơn'
          className="info-container"
          extraTitle={
            <div className="save-close">
              <ButtonComponent
                label='Lưu'
                type="submit"
                className="save-btn"
                variant="primary"
              />
              <div className="close-btn">
                <IoClose size={28} className="close-icon" onClick={() => {
                  setIsShowNote(false);
                  hideOverlay();
                  reset();
                }} />
              </div>
            </div>
          }
          children={
            <div className="export-receipt-info">
              <InputComponent
                name="note"
                placeholder="Nhập lý do hủy đơn"
                isTextarea
                register={register}
              />
            </div>
          }
        />
      </form>
    </>
  );
};

export default ClientOrderDetail;
