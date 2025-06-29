import { AdminContainerComponent, BackComponent, ButtonComponent, OrderStatusComponent, TableComponent, TextComponent } from "@/components";
import './OrderDetail.scss';
import { IoPrint } from "react-icons/io5";
import { AdminOrderDetail, OrderStatus } from "@/types/Order";
import { Gender } from "@/types/User";
import { datetimeFormatter } from "@/utils/datetimeFormatter";
import SeparateNumber from "@/utils/separateNumber";

interface IProps {
  setIsShowDetail: React.Dispatch<React.SetStateAction<boolean>>;
  detailData: AdminOrderDetail | undefined;
}

const headers = ['Mã thực phẩm', 'Tên thực phẩm', 'Số lượng', 'Đơn vị tính'];

const OrderDetail = (props: IProps) => {
  const { setIsShowDetail, detailData } = props;
  return (
    <>
      {detailData && (
        <div className="order-detail-component">
          <BackComponent backTitle="Quay lại danh sách đơn hàng" onBack={() => {
            setIsShowDetail(false);
            window.location.reload();
          }} />
          <div className="order-detail-header">
            <div className="order-code-print">
              <TextComponent
                text={detailData.maDonHang}
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
              <OrderStatusComponent status={OrderStatus[detailData.trangThai]} time={datetimeFormatter(detailData.ngayCapNhat + '')} statusItems={['Đặt hàng', 'Đóng gói', 'Xuất kho', 'Hoàn thành']} />
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
                      <span className="content">: {detailData.thongTinKhachHang.maNguoiDung}</span>
                    </div>
                    <div>
                      <span className="title">Họ tên khách hàng</span>
                      <span className="content">: {detailData.thongTinKhachHang.hoTen}</span>
                    </div>
                    <div>
                      <span className="title">Giới tính</span>
                      <span className="content">: {Gender[detailData.thongTinKhachHang.gioiTinh]}</span>
                    </div>
                    <div>
                      <span className="title">Số điện thoại</span>
                      <span className="content">: {detailData.thongTinKhachHang.soDienThoai}</span>
                    </div>
                    <div>
                      <span className="title">Email</span>
                      <span className="content">: {detailData.thongTinKhachHang.email}</span>
                    </div>
                    <div>
                      <span className="title">Địa chỉ</span>
                      <span className="content">: {detailData.thongTinKhachHang.diaChi}</span>
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
                      <span className="title">Mã nhân viên giao hàng</span>
                      <span className="content">: {detailData.thongTinNhanVien.maNguoiDung || <i>Chưa nhận đơn</i>}</span>
                    </div>
                    <div>
                      <span className="title">Tên nhân viên giao hàng</span>
                      <span className="content">: {detailData.thongTinNhanVien.hoTen || <i>Chưa nhận đơn</i>}</span>
                    </div>
                    <div>
                      <span className="title">Mã phiếu xuất</span>
                      <span className="content">: {detailData.maPhieuXuat || <i>Chưa xuất kho</i>}</span>
                    </div>
                    <div>
                      <span className="title">Địa chỉ nhận hàng</span>
                      <span className="content">: {detailData.diaChiNhan}</span>
                    </div>
                    <div>
                      <span className="title">Ngày tạo đơn</span>
                      <span className="content">: {datetimeFormatter(detailData.ngayTao + '')}</span>
                    </div>
                    <div>
                      <span className="title">Giá trị đơn hàng</span>
                      <span className="content">: {`${SeparateNumber(detailData.tongTien)}₫`}</span>
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
                  <p>
                    {detailData.ghiChu}
                  </p>
                }
              />
              <AdminContainerComponent
                className="food-info-container"
                title='Thông tin thực phẩm'
                children={
                  <div className="food-info">
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
                        {detailData.thongTinThucPham?.map((product, idx) => (
                          <tr key={idx} className="tb-body-row">
                            <td style={{ padding: '10px 0 10px 20px', textAlign: 'justify' }}>
                              <span>{product.maThucPham}</span>
                            </td>
                            <td>
                              <span>{product.tenThucPham}</span>
                            </td>
                            <td>
                              <span>{product.soLuong}</span>
                            </td>
                            <td>
                              <span>{product.donViTinh}</span>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                }
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default OrderDetail;
