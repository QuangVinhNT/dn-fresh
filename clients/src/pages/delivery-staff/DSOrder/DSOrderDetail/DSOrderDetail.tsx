import { AdminContainerComponent, BackComponent, ButtonComponent, InputComponent, OkCancelModal, OrderStatusComponent } from "@/components";
import { OrderDetail, OrderStatus, PaymentMethod } from "@/types/Order";
import { datetimeFormatter } from "@/utils/datetimeFormatter";
import SeparateNumber from "@/utils/separateNumber";
import './DSOrderDetail.scss';
import { useState } from "react";
import webColors from "@/constants/webColors";
import { overlayStore, userStore } from "@/store";
import { confirmCancelOrder, confirmExportOrder, confirmFinishOrder } from "@/api/orderApi";
import { toast } from "react-toastify";
import { IoClose } from "react-icons/io5";
import { SubmitHandler, useForm } from "react-hook-form";
import { FormValues } from "@/types/Object";

interface IProps {
  setIsShowDetail: React.Dispatch<React.SetStateAction<boolean>>;
  detailData: OrderDetail | undefined;
  onUpdated: () => void;
}

const DSOrderDetail = (props: IProps) => {
  const { setIsShowDetail, detailData, onUpdated } = props;
  const [isShowConfirmModal, setIsShowConfirmModal] = useState(false);
  const [isShowNote, setIsShowNote] = useState(false);
  const { register, reset, handleSubmit } = useForm<FormValues>();
  const { showOverlay, hideOverlay } = overlayStore();
  const { user } = userStore();

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    try {
      const payload = {
        maDonHang: detailData?.maDonHang + '',
        maNhanVien: user?.id + '',
        ghiChu: data['note'].toString()
      };
      const cancelResult = await confirmCancelOrder(payload.maDonHang, payload.maNhanVien, payload.ghiChu);
      console.log('Cancel result:', cancelResult);
      setIsShowNote(false);
      hideOverlay();
      reset();
      onUpdated();
      toast.success('Hủy đơn hàng thành công!');
      setIsShowDetail(false);
    } catch (error) {
      toast.error(`Lỗi: ${error}`);
    }
  };

  return (
    <>
      {detailData && (
        <div className="order-detail-component">
          <div className="order-detail-tools">
            <BackComponent backTitle="Quay lại danh sách đơn hàng" onBack={() => setIsShowDetail(false)} />
            {detailData.trangThai === 2 && (
              <ButtonComponent
                className="btn-confirm"
                type="no-submit"
                label="Xác nhận xuất kho"
                variant="primary"
                onClick={() => {
                  setIsShowConfirmModal(true);
                  showOverlay();
                }}
              />
            )}
            {detailData.trangThai === 3 && (
              <div style={{ display: 'flex', gap: '4px' }}>
                <ButtonComponent
                  className="btn-confirm"
                  type="no-submit"
                  label="Hủy đơn"
                  variant="danger"
                  onClick={() => {
                    setIsShowNote(true);
                    showOverlay();
                  }}
                />
                <ButtonComponent
                  className="btn-confirm"
                  type="no-submit"
                  label="Xác nhận hoàn thành"
                  variant="secondary"
                  onClick={() => {
                    setIsShowConfirmModal(true);
                    showOverlay();
                  }}
                />
              </div>
            )}
          </div>
          <div className="order-detail-content">
            <div className="order-status">
              <OrderStatusComponent status={OrderStatus[detailData.trangThai]} time={datetimeFormatter(detailData.ngayCapNhat + '')} statusItems={['Đặt hàng', 'Đóng gói', 'Xuất kho', 'Hoàn thành']} />
            </div>
            <div className="order-info-products">
              <div className="order-info">
                <h3>Thông tin đơn hàng</h3>
                <ul>
                  <li><b>Mã đơn hàng:</b> {detailData.maDonHang}</li>
                  <li><b>Người nhận:</b> {detailData.nguoiNhan}</li>
                  <li><b>Địa chỉ nhận:</b> {detailData.diaChiNhan}</li>
                  <li><b>Ngày tạo đơn:</b> {datetimeFormatter(detailData.ngayTao + '')}</li>
                  <li><b>Phương thức thanh toán:</b> {PaymentMethod[detailData.phuongThucThanhToan]}</li>
                  <li><b>Ghi chú:</b> {detailData.ghiChu}</li>
                </ul>
              </div>
              <div className="order-products">
                <h3>Thông tin thực phẩm</h3>
                {detailData.thongTinThucPham.map((item, idx) => (
                  <div className="prd-item" key={idx}>
                    <img src={item.hinhAnh} alt="" />
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
                  <b><span>Tổng tiền: </span>{SeparateNumber(detailData.tongTien)}₫</b>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      <div className="confirm-modal" style={{ top: isShowConfirmModal ? '50%' : '-100%' }}>
        <OkCancelModal
          data={{
            message: <p>Xác nhận <b style={{ color: detailData?.trangThai === 2 ? webColors.adminPrimary : webColors.primary }}>{detailData?.trangThai === 2 ? 'xuất kho' : 'hoàn thành'}</b> đơn hàng <b>{detailData?.maDonHang}</b> chứ?</p>
          }}
          onOk={async () => {
            try {
              if (detailData?.trangThai === 2) {
                const result = await confirmExportOrder(detailData.maDonHang, user?.id + '');
                console.log(result);
              } else if (detailData?.trangThai === 3) {
                const result = await confirmFinishOrder(detailData.maDonHang, user?.id + '');
                console.log(result);
              }
              setIsShowDetail(false);
              setIsShowConfirmModal(false);
              hideOverlay();
              onUpdated();
              toast.success(`Xác nhận ${detailData?.trangThai === 2 ? 'xuất kho' : 'hoàn thành'} thành công!`);
            } catch (error) {
              toast.error(`Lỗi: ${error}`);
            }
          }}
          onCancel={() => {
            setIsShowConfirmModal(false);
            hideOverlay();
          }}
          onClose={() => {
            setIsShowConfirmModal(false);
            hideOverlay();
          }}
        />
      </div>
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

export default DSOrderDetail;
