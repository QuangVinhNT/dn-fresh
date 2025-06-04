import { getCustomerById, getCustomers, lockAccount, unlockAccount } from "@/api/userApi";
import { FilterComponent, OkCancelModal, SearchComponent, TablePagination } from "@/components";
import { loadingStore, overlayStore } from "@/store";
import { FilterType } from "@/types";
import { CustomerDetailType, CustomerList, Gender, UserStatus } from "@/types/User";
import { dateFormatter, datetimeFormatter } from "@/utils/datetimeFormatter";
import { useEffect, useRef, useState } from "react";
import { IoFilter } from "react-icons/io5";
import { TfiExport } from "react-icons/tfi";
import './Customer.scss';
import CustomerDetail from "./CustomerDetail/CustomerDetail";
import webColors from "@/constants/webColors";

const headers = ['Mã người dùng', 'Họ tên', 'Ngày sinh', 'Giới tính', 'Email', 'Trạng thái', 'Ngày tạo'];


const Customer = () => {
  const [isShowDetail, setIsShowDetail] = useState(false);
  const [isShowOkCancel, setIsShowOkCancel] = useState(false);
  const [accountStatusData, setAccountStatusData] = useState<{ id: string, type: 'lock' | 'unlock'; }>({ id: '', type: 'lock' });
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
              <SearchComponent placeholder="Nhập mã khách hàng..." onSearch={fetchCustomers} keywordRef={keywordRef} />
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
          <div className="customer-detail-modal" style={{ top: isShowDetail ? '50%' : '-100%' }}>
            <CustomerDetail
              setIsShowDetail={setIsShowDetail}
              detailData={customer}
              setIsShowOkCancel={setIsShowOkCancel}
              setAccountStatusData={setAccountStatusData} />
          </div>
          <div className="ok-cancel-modal" style={{ top: isShowOkCancel ? '50%' : '-100%' }}>
            <OkCancelModal
              data={{
                message: <p>Bạn chắc chắn muốn <b style={{color: accountStatusData.type === 'lock' ? 'red' : webColors.adminPrimary}}>{accountStatusData.type === 'lock' ? 'khóa' : 'mở khóa'}</b> tài khoản <b>{accountStatusData.id}</b> chứ?</p>
              }}
              onOk={async () => {
                if (accountStatusData.type === 'lock') {
                  const lockResult = await lockAccount(accountStatusData.id);
                  console.log(lockResult);
                  setIsShowDetail(false);
                  setIsShowOkCancel(false);
                  fetchCustomers();
                  hideOverlay();
                } else {
                  const unlockResult = await unlockAccount(accountStatusData.id);
                  console.log(unlockResult);
                  setIsShowDetail(false);
                  setIsShowOkCancel(false);
                  fetchCustomers();
                  hideOverlay();
                }
              }}
              onCancel={() => {
                setIsShowOkCancel(false);
                setIsShowDetail(true);
              }}
              onClose={() => {
                setIsShowOkCancel(false);
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
