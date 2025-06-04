import { AdminContainerComponent, ButtonComponent, InfoItemComponent } from "@/components";
import { overlayStore } from "@/store";
import { CustomerDetailType, Gender, UserStatus } from "@/types/User";
import { datetimeFormatter } from "@/utils/datetimeFormatter";
import { IoClose } from "react-icons/io5";
import './CustomerDetail.scss';

interface IProps {
  setIsShowDetail: React.Dispatch<React.SetStateAction<boolean>>;
  detailData: CustomerDetailType | undefined;
  setIsShowLockOkCancel: React.Dispatch<React.SetStateAction<boolean>>;
  setAccountStatusData: React.Dispatch<React.SetStateAction<{ id: string, type: 'lock' | 'unlock'; }>>;
  setIsShowRoles: React.Dispatch<React.SetStateAction<boolean>>;
}

const CustomerDetail = (props: IProps) => {
  const { setIsShowDetail, detailData, setIsShowLockOkCancel, setAccountStatusData, setIsShowRoles } = props;
  const { hideOverlay } = overlayStore();
  return (
    <>
      {detailData && (
        <AdminContainerComponent
          title='Thông tin khách hàng'
          className="customer-info-container"
          extraTitle={
            <div style={{ display: 'flex', alignItems: 'center', gap: '24px' }}>
              {detailData.danhSachVaiTro.length === 1 && (
                <div className="add-role">
                  <ButtonComponent
                    className="btn-add-role"
                    type="no-submit"
                    label="Thêm vai trò"
                    variant="secondary"
                    onClick={() => {                      
                      setIsShowDetail(false);
                      setIsShowRoles(true);
                    }}
                  />
                </div>
              )}
              <div className="lock-unlock">
                {detailData.trangThai === 1 ? (
                  <ButtonComponent
                    className="btn-lock"
                    type="no-submit"
                    label="Khóa tài khoản"
                    variant="danger"
                    onClick={() => {
                      setIsShowLockOkCancel(true);
                      setIsShowDetail(false);
                      setAccountStatusData({
                        id: detailData.maNguoiDung,
                        type: 'lock'
                      });
                    }}
                  />
                ) : (
                  <ButtonComponent
                    className="btn-unlock"
                    type="no-submit"
                    label="Mở tài khoản"
                    variant="primary"
                    onClick={() => {
                      setIsShowLockOkCancel(true);
                      setIsShowDetail(false);
                      setAccountStatusData({
                        id: detailData.maNguoiDung,
                        type: 'unlock'
                      });
                    }}
                  />
                )}
              </div>
              <div className="close-btn">
                <IoClose size={28} className="close-icon" onClick={() => {
                  setIsShowDetail(false);
                  hideOverlay();
                }} />
              </div>
            </div>
          }
          children={
            <div className="customer-info">
              <div className="avatar">
                <img src={detailData.hinhAnh || 'https://res.cloudinary.com/deu6ox2tv/image/upload/v1748832089/uploads/kvvrnblwls3vbesc09yi.png'} alt="Avatar" />
              </div>
              <div className="info">
                <InfoItemComponent
                  content={detailData.maNguoiDung}
                  title="Mã khách hàng:"
                />
                <InfoItemComponent
                  content={detailData.hoTen}
                  title="Tên khách hàng:"
                />
                <InfoItemComponent
                  content={Gender[detailData.gioiTinh]}
                  title="Giới tính:"
                />
                <InfoItemComponent
                  content={detailData.soDienThoai}
                  title="Số điện thoại:"
                />
                <InfoItemComponent
                  content={detailData.diaChi}
                  title="Địa chỉ:"
                />
                <InfoItemComponent
                  content={detailData.email}
                  title="Email:"
                />
                <InfoItemComponent
                  content={datetimeFormatter(detailData.ngayTao + '')}
                  title="Thời gian tài khoản:"
                />
                <InfoItemComponent
                  content={datetimeFormatter(detailData.ngayCapNhat + '')}
                  title="Thời gian cập nhật tài khoản:"
                />
                <InfoItemComponent
                  content={detailData.soLuongDonHang.toString()}
                  title="Số lượng đơn hàng đã mua:"
                />
                <InfoItemComponent
                  content={UserStatus[detailData.trangThai]}
                  title="Trạng thái tài khoản:"
                />
              </div>
            </div>
          }
        />
      )}
    </>
  );
};

export default CustomerDetail;
