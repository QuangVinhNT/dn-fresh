import { AdminContainerComponent, ButtonComponent, InfoItemComponent } from "@/components";
import { overlayStore } from "@/store";
import { Gender, Role, StaffDetailType, UserStatus } from "@/types/User";
import { datetimeFormatter } from "@/utils/datetimeFormatter";
import { IoClose } from "react-icons/io5";
import './StaffDetail.scss';

interface IProps {
  setIsShowDetail: React.Dispatch<React.SetStateAction<boolean>>;
  setIsShowRoles: React.Dispatch<React.SetStateAction<boolean>>;
  detailData: StaffDetailType | undefined;
  setIsShowLockOkCancel: React.Dispatch<React.SetStateAction<boolean>>;
  setIsShowDeleteOkCancel: React.Dispatch<React.SetStateAction<boolean>>;
  setAccountStatusData: React.Dispatch<React.SetStateAction<{ id: string, type?: 'lock' | 'unlock'; }>>;
}

const StaffDetail = (props: IProps) => {
  const { setIsShowDetail, detailData, setIsShowLockOkCancel, setAccountStatusData, setIsShowDeleteOkCancel, setIsShowRoles } = props;
  const { hideOverlay } = overlayStore();
  return (
    <>
      {detailData && (
        <AdminContainerComponent
          title='Thông tin nhân sự'
          className="staff-info-container"
          extraTitle={
            <div style={{ display: 'flex', alignItems: 'center', gap: detailData.danhSachVaiTro.find(role => role === 'VT004') ? '300px' : '12px' }}>
              <div className="change-cancel">
                <div className="change-role">
                  <ButtonComponent
                    className="btn-change-role"
                    type="no-submit"
                    label="Đổi vai trò"
                    variant="secondary"
                    onClick={() => {
                      setIsShowDetail(false);
                      setIsShowRoles(true);
                    }}
                  />
                </div>
                {detailData.danhSachVaiTro.find(role => role === 'VT004') && (
                  <div className="cancel-role">
                    <ButtonComponent
                      className="btn-cancel-role"
                      type="no-submit"
                      label="Hủy tài khoản nhân sự"
                      onClick={() => {
                        setIsShowDetail(false);
                        setIsShowDeleteOkCancel(true);
                        setAccountStatusData({
                          id: detailData.maNguoiDung
                        })
                      }}
                    />
                  </div>
                )}
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '24px' }}>
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
            </div>
          }
          children={
            <div className="staff-info">
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
                  content={detailData.danhSachVaiTro.map(role => Role[role as keyof typeof Role]).join(', ')}
                  title="Vai trò:"
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

export default StaffDetail;
