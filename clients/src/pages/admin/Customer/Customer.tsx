import { getCustomerById, getCustomers, insertUserRole, lockAccount, unlockAccount } from "@/api/userApi";
import AdminIcon from '@/assets/images/admin-icon.png';
import DeliveryStaffIcon from '@/assets/images/delivery-icon.png';
import InventoryStaffIcon from '@/assets/images/inventory-icon.png';
import { AdminContainerComponent, FilterComponent, OkCancelModal, SearchComponent, TablePagination } from "@/components";
import webColors from "@/constants/webColors";
import { loadingStore, overlayStore } from "@/store";
import { FilterType } from "@/types";
import { CustomerDetailType, CustomerList, Gender, InsertUserRolePayload, Role, UserStatus } from "@/types/User";
import { dateFormatter, datetimeFormatter } from "@/utils/datetimeFormatter";
import { useEffect, useRef, useState } from "react";
import { IoClose, IoFilter } from "react-icons/io5";
import { TfiExport } from "react-icons/tfi";
import './Customer.scss';
import CustomerDetail from "./CustomerDetail/CustomerDetail";

const headers = ['Mã người dùng', 'Họ tên', 'Ngày sinh', 'Giới tính', 'Email', 'Trạng thái', 'Ngày tạo'];

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

const Customer = () => {
  const [isShowDetail, setIsShowDetail] = useState(false);
  const [isShowLockOkCancel, setIsShowLockOkCancel] = useState(false);
  const [isShowRolesOkCancel, setIsShowRolesOkCancel] = useState(false);
  const [isShowRoles, setIsShowRoles] = useState(false);
  const [accountStatusData, setAccountStatusData] = useState<{ id: string, type: 'lock' | 'unlock'; }>({ id: '', type: 'lock' });
  const [accountRoleData, setAccountRoleData] = useState<{ id: string, roleId: string; }>({ id: '', roleId: '' });
  const [customers, setCustomers] = useState<CustomerList[]>([]);
  const [customer, setCustomer] = useState<CustomerDetailType>();
  const [page, setPage] = useState<number>(1);
  const [limit, setLimit] = useState<number>(5);
  const [total, setTotal] = useState<number>(0);
  const [filters, setFilters] = useState<FilterType[]>([]);

  const keywordRef = useRef<string>('');

  const { showLoading, hideLoading } = loadingStore();
  const { showOverlay, hideOverlay } = overlayStore();

  useEffect(() => {
    const statusFilter = filters.find(filter => filter.name === 'status')?.value;
    fetchCustomers(statusFilter);
  }, [limit, page, filters]);

  const fetchCustomers = async (status?: string) => {
    showLoading();
    try {
      const response = await getCustomers(page, limit, keywordRef.current, status);
      setCustomers(response.data);
      setTotal(response.total);
    } catch (error) {
      console.error('Error when load product:', error);
    } finally {
      hideLoading();
    }
  };

  const fetchCustomerById = async (customerId: string) => {
    showLoading();
    try {
      const response = await getCustomerById(customerId);
      setCustomer(response);
    } catch (error) {
      console.error('Error when load product:', error);
    } finally {
      hideLoading();
    }
  };

  const handleClickRow = (customerId: string) => {
    fetchCustomerById(customerId);
    setIsShowDetail(true);
    setAccountRoleData({
      id: customerId,
      roleId: ''
    });
    showOverlay();
  };

  return (
    <>
      {customers && (
        <div className="customer-component">
          <div className="customer-header">
            <div className="export-file">
              <TfiExport className="icn-download" />
              <span>Xuất file</span>
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
              </div>
            </div>
            <div className="search">
              <SearchComponent placeholder="Nhập mã khách hàng..." onSearch={fetchCustomers} keywordRef={keywordRef} setPage={setPage} />
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
                {customers?.map((customer, idx) => (
                  <tr key={idx} className="tb-body-row" onClick={() => {
                    handleClickRow(customer.maNguoiDung);
                  }}>
                    <td style={{ padding: '10px 0 10px 20px', textAlign: 'justify' }}>
                      <span>{customer.maNguoiDung}</span>
                    </td>
                    <td>
                      <span>{customer.hoTen}</span>
                    </td>
                    <td>
                      <span>{dateFormatter.format(new Date(customer.ngaySinh))}</span>
                    </td>
                    <td>
                      <span>{Gender[customer.gioiTinh]}</span>
                    </td>
                    <td>
                      <span>{customer.email}</span>
                    </td>
                    <td>
                      <span>{UserStatus[customer.trangThai]}</span>
                    </td>
                    <td>
                      <span>{datetimeFormatter(customer.ngayTao + '')}</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <TablePagination page={page} setPage={setPage} limit={limit} setLimit={setLimit} total={total} />
          </div>

          {/* Customer detail modal */}
          <div className="customer-detail-modal" style={{ top: isShowDetail ? '50%' : '-100%' }}>
            <CustomerDetail
              setIsShowDetail={setIsShowDetail}
              detailData={customer}
              setIsShowLockOkCancel={setIsShowLockOkCancel}
              setAccountStatusData={setAccountStatusData}
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
                fetchCustomers();
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
                  {roles.map((item, idx) => (
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
                message: <p>Bạn chắc chắn muốn thêm vai trò <b style={{ color: webColors.adminPrimary }}>{Role[accountRoleData.roleId as keyof typeof Role]}</b> cho tài khoản <b>{accountRoleData.id}</b> chứ?</p>
              }}
              onOk={async () => {
                const payload: InsertUserRolePayload = {
                  maNguoiDung: accountRoleData.id,
                  maVaiTro: accountRoleData.roleId
                };
                const insertResult = await insertUserRole(payload);
                console.log(insertResult);
                setIsShowDetail(false);
                setIsShowRolesOkCancel(false);
                fetchCustomers();
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
    </>
  );
};

export default Customer;
