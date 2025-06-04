import { deleteAllStaffRole, getStaffById, getStaffs, lockAccount, unlockAccount, updateRole } from "@/api/userApi";
import { AdminContainerComponent, ButtonComponent, FilterComponent, OkCancelModal, SearchComponent, TablePagination } from "@/components";
import webColors from "@/constants/webColors";
import { loadingStore, overlayStore } from "@/store";
import { FilterType } from "@/types";
import { Gender, Role, StaffDetailType, StaffList, UserStatus } from "@/types/User";
import { dateFormatter, datetimeFormatter } from "@/utils/datetimeFormatter";
import { useEffect, useRef, useState } from "react";
import { IoAdd, IoCalendarOutline, IoClose, IoFilter } from "react-icons/io5";
import { TfiExport } from "react-icons/tfi";
import AddStaff from "./AddStaff/AddStaff";
import SchedulingStaff from "./SchedulingStaff/SchedulingStaff";
import './Staff.scss';
import StaffDetail from "./StaffDetail/StaffDetail";
import AdminIcon from '@/assets/images/admin-icon.png';
import DeliveryStaffIcon from '@/assets/images/delivery-icon.png';
import InventoryStaffIcon from '@/assets/images/inventory-icon.png';

const headers = ['Mã người dùng', 'Họ tên', 'Ngày sinh', 'Giới tính', 'Trạng thái', 'Vai trò', 'Ngày tạo'];

const roles = [
  {
    image: AdminIcon,
    label: 'Quản trị viên',
    roleId: 'VT001'
  },
  {
    image: InventoryStaffIcon,
    label: 'Nhân viên kho',
    roleId: 'VT002'
  },
  {
    image: DeliveryStaffIcon,
    label: 'Nhân viên giao hàng',
    roleId: 'VT003'
  },
];

const Staff = () => {
  const [isShowAdd, setIsShowAdd] = useState(false);
  const [isShowDetail, setIsShowDetail] = useState(false);
  const [isShowLockOkCancel, setIsShowLockOkCancel] = useState(false);
  const [isShowDeleteOkCancel, setIsShowDeleteOkCancel] = useState(false);
  const [isShowRolesOkCancel, setIsShowRolesOkCancel] = useState(false);
  const [isShowScheduling, setIsShowScheduling] = useState(false);
  const [isShowRoles, setIsShowRoles] = useState(false);
  const [accountStatusData, setAccountStatusData] = useState<{ id: string, type?: 'lock' | 'unlock'; }>({ id: '', type: 'lock' });
  const [accountRoleData, setAccountRoleData] = useState<{ id: string, roleId: string; }>({ id: '', roleId: '' });
  const [staffs, setStaffs] = useState<StaffList[]>([]);
  const [staff, setStaff] = useState<StaffDetailType>();
  const [page, setPage] = useState<number>(1);
  const [limit, setLimit] = useState<number>(5);
  const [total, setTotal] = useState<number>(0);
  const [filters, setFilters] = useState<FilterType[]>([]);

  const keywordRef = useRef<string>('');

  const { showLoading, hideLoading } = loadingStore();
  const { showOverlay, hideOverlay } = overlayStore();

  useEffect(() => {
    const statusFilter = filters.find(filter => filter.name === 'status')?.value;
    const roleFilter = filters.find(filter => filter.name === 'role')?.value;
    fetchStaffs(statusFilter, roleFilter);
  }, [limit, page, filters]);

  const fetchStaffs = async (status?: string, roleId?: string) => {
    showLoading();
    try {
      const response = await getStaffs(page, limit, keywordRef.current, status, roleId);
      setStaffs(response.data);
      setTotal(response.total);
    } catch (error) {
      console.error('Error when load product:', error);
    } finally {
      hideLoading();
    }
  };

  const fetchStaffById = async (staffId: string) => {
    showLoading();
    try {
      const response = await getStaffById(staffId);
      setStaff(response);
      setAccountRoleData({
        id: response.maNguoiDung,
        roleId: response.danhSachVaiTro.filter((roleId: string) => roleId !== 'VT004')?.[0] || ''
      })
    } catch (error) {
      console.error('Error when load product:', error);
    } finally {
      hideLoading();
    }
  };

  const handleClickRow = (staffId: string) => {
    fetchStaffById(staffId);
    setIsShowDetail(true);
    showOverlay();
  };

  return (
    <>
      {(staffs && !isShowScheduling) && (
        <div className="staff-component">
          <div className="staff-header">
            <div className="staff-header-tools">
              <div className="export-file">
                <TfiExport className="icn-download" />
                <span>Xuất file</span>
              </div>
              <div className="scheduling" onClick={() => { setIsShowScheduling(true); }}>
                <IoCalendarOutline className="icn-scheduling" />
                <span>Phân lịch</span>
              </div>
            </div>
            <div className="add-container">
              <ButtonComponent
                className="btn-add"
                type="no-submit"
                label="Thêm nhân sự"
                variant="primary"
                affix={<IoAdd className="icn-add" />}
                onClick={() => { setIsShowAdd(true); }}
              />
            </div>
          </div>
          <div className="table-component">
            <div className="filter">
              <h3><IoFilter /> Bộ lọc</h3>
              <div className="filter-list">
                <FilterComponent
                  filterItems={[
                    {
                      name: 'Vô hiệu hóa',
                      value: 0,
                    },
                    {
                      name: 'Hoạt động',
                      value: 1,
                    }
                  ]}
                  filterType={{
                    name: 'Trạng thái',
                    value: 'status'
                  }}
                  setFilters={setFilters}
                />
                <FilterComponent
                  filterItems={[
                    {
                      name: 'Quản trị viên',
                      value: 'VT001',
                    },
                    {
                      name: 'Nhân viên kho',
                      value: 'VT002',
                    },
                    {
                      name: 'Nhân viên giao hàng',
                      value: 'VT003',
                    }
                  ]}
                  filterType={{
                    name: 'Vai trò',
                    value: 'role'
                  }}
                  setFilters={setFilters}
                />
              </div>
            </div>
            <div className="search">
              <SearchComponent placeholder="Nhập mã nhân viên..." onSearch={fetchStaffs} keywordRef={keywordRef} />
            </div>
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
                {staffs?.map((staff, idx) => (
                  <tr key={idx} className="tb-body-row" onClick={() => {
                    handleClickRow(staff.maNguoiDung);
                  }}>
                    <td style={{ padding: '10px 0 10px 20px', textAlign: 'justify' }}>
                      <span>{staff.maNguoiDung}</span>
                    </td>
                    <td>
                      <span>{staff.hoTen}</span>
                    </td>
                    <td>
                      <span>{dateFormatter.format(new Date(staff.ngaySinh))}</span>
                    </td>
                    <td>
                      <span>{Gender[staff.gioiTinh]}</span>
                    </td>
                    <td>
                      <span>{UserStatus[staff.trangThai]}</span>
                    </td>
                    <td>
                      <span>{Role[staff.maVaiTro as keyof typeof Role]}</span>
                    </td>
                    <td>
                      <span>{datetimeFormatter(staff.ngayTao + '')}</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <TablePagination page={page} setPage={setPage} limit={limit} setLimit={setLimit} total={total} />
          </div>

          {/* Detail modal */}
          <div className="staff-detail-modal" style={{ top: isShowDetail ? '50%' : '-100%' }}>
            <StaffDetail
              setIsShowDetail={setIsShowDetail}
              detailData={staff}
              setIsShowLockOkCancel={setIsShowLockOkCancel}
              setAccountStatusData={setAccountStatusData}
              setIsShowDeleteOkCancel={setIsShowDeleteOkCancel}
              setIsShowRoles={setIsShowRoles}
            />
          </div>

          <div className="ok-cancel-lock-modal" style={{ top: isShowLockOkCancel ? '50%' : '-100%' }}>
            <OkCancelModal
              data={{
                message: <p>Bạn chắc chắn muốn <b style={{ color: accountStatusData.type === 'lock' ? 'red' : webColors.adminPrimary }}>{accountStatusData.type === 'lock' ? 'khóa' : 'mở khóa'}</b> tài khoản <b>{accountStatusData.id}</b> chứ?</p>
              }}
              onOk={async () => {
                if (accountStatusData.type === 'lock') {
                  const lockResult = await lockAccount(accountStatusData.id);
                  console.log(lockResult);
                } else {
                  const unlockResult = await unlockAccount(accountStatusData.id);
                  console.log(unlockResult);
                }
                setIsShowDetail(false);
                setIsShowLockOkCancel(false);
                fetchStaffs();
                hideOverlay();
              }}
              onCancel={() => {
                setIsShowLockOkCancel(false);
                setIsShowDetail(true);
              }}
              onClose={() => {
                setIsShowLockOkCancel(false);
                setIsShowDetail(true);
              }}
            />
          </div>

          <div className="ok-cancel-delete-modal" style={{ top: isShowDeleteOkCancel ? '50%' : '-100%' }}>
            <OkCancelModal
              data={{
                message: <p>Bạn chắc chắn muốn hủy tài khoản nhân sự của người dùng <b>{accountStatusData.id}</b> chứ?</p>
              }}
              onOk={async () => {
                const deleteResult = await deleteAllStaffRole(accountStatusData.id);
                console.log(deleteResult)
                setIsShowDetail(false);
                setIsShowDeleteOkCancel(false);
                fetchStaffs();
                hideOverlay();
              }}
              onCancel={() => {
                setIsShowDeleteOkCancel(false);
                setIsShowDetail(true);
              }}
              onClose={() => {
                setIsShowDeleteOkCancel(false);
                setIsShowDetail(true);
              }}
            />
          </div>

          {/* Role modal */}
          <div className="roles-modal" style={{ top: isShowRoles ? '50%' : '-100%' }}>
            <AdminContainerComponent
              title='Chọn vai trò muốn thêm'
              className="roles-container"
              extraTitle={
                <div className="close-btn">
                  <IoClose size={28} className="close-icon" onClick={() => {
                    setIsShowDetail(true);
                    setIsShowRoles(false);
                  }} />
                </div>
              }
              children={
                <div className="role-list">
                  {roles.filter(role => role.roleId !== accountRoleData.roleId).map((item, idx) => (
                    <div className="role-item" key={idx} onClick={() => {
                      setIsShowRolesOkCancel(true);
                      setIsShowRoles(false);
                      setAccountRoleData(prev => ({
                        ...prev,
                        roleId: item.roleId
                      }));
                    }}>
                      <img src={item.image} alt="" />
                      <span>{item.label}</span>
                    </div>
                  ))}
                </div>
              }
            />
          </div>

          <div className="ok-cancel-roles-modal" style={{ top: isShowRolesOkCancel ? '50%' : '-100%' }}>
            <OkCancelModal
            data={{
                message: <p>Bạn chắc chắn muốn đổi vai trò <b style={{ color: webColors.adminPrimary }}>{Role[accountRoleData.roleId as keyof typeof Role]}</b> cho tài khoản <b>{accountRoleData.id}</b> chứ?</p>
              }}
              onOk={async () => {                
                const updateResult = await updateRole(accountRoleData.id, accountRoleData.roleId);
                console.log(updateResult);
                setIsShowDetail(false);
                setIsShowRolesOkCancel(false);
                fetchStaffs();
                hideOverlay();
              }}
              onCancel={() => {
                setIsShowRolesOkCancel(false);
                setIsShowDetail(true);
              }}
              onClose={() => {
                setIsShowRolesOkCancel(false);
                setIsShowDetail(true);
              }}
            />
          </div>
        </div>
      )}

      {isShowAdd && <AddStaff setIsShowAdd={setIsShowAdd} onAdded={fetchStaffs} />}

      {isShowScheduling && <SchedulingStaff setIsShowScheduling={setIsShowScheduling} />}
    </>
  );
};

export default Staff;
