import { getCustomers } from "@/api/userApi";
import { ButtonComponent, FilterComponent, SearchComponent, TablePagination } from "@/components";
import { loadingStore } from "@/store";
import { FilterType } from "@/types";
import { CustomerList, Gender, UserStatus } from "@/types/User";
import { dateFormatter, datetimeFormatter } from "@/utils/datetimeFormatter";
import { useEffect, useRef, useState } from "react";
import { IoAdd, IoFilter } from "react-icons/io5";
import { TfiExport } from "react-icons/tfi";
import AddCustomer from "./AddCustomer/AddCustomer";
import './Customer.scss';
import CustomerDetail from "./CustomerDetail/CustomerDetail";
import EditCustomer from "./CustomerDetail/EditCustomer/EditCustomer";

const headers = ['Mã người dùng', 'Họ tên', 'Ngày sinh', 'Giới tính', 'Email', 'Trạng thái', 'Ngày tạo'];


const Customer = () => {
  const [isShowAdd, setIsShowAdd] = useState(false);
  const [isShowDetail, setIsShowDetail] = useState(false);
  const [isShowEdit, setIsShowEdit] = useState(false);
  const [customers, setCustomers] = useState<CustomerList[]>([])
  const [page, setPage] = useState<number>(1);
  const [limit, setLimit] = useState<number>(5);
  const [total, setTotal] = useState<number>(0);
  const [filters, setFilters] = useState<FilterType[]>([]);

  const keywordRef = useRef<string>('');

  const { showLoading, hideLoading } = loadingStore();

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

  return (
    <>
      {(!isShowAdd && !isShowDetail && !isShowEdit) && (
        <div className="customer-component">
          <div className="customer-header">
            <div className="export-file">
              <TfiExport className="icn-download" />
              <span>Xuất file</span>
            </div>
            <ButtonComponent
              className="btn-add"
              type="no-submit"
              label="Thêm khách hàng"
              variant="primary"
              affix={<IoAdd className="icn-add" />}
              onClick={() => { setIsShowAdd(true); }}
            />
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
                    // handleClickRow(product.id); 
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
            <TablePagination page={page} setPage={setPage} limit={limit} setLimit={setLimit} total={total}/>
          </div>
        </div>
      )}

      {isShowAdd && <AddCustomer setIsShowAdd={setIsShowAdd}/>}
      
      {isShowDetail && <CustomerDetail setIsShowDetail={setIsShowDetail} setIsShowEdit={setIsShowEdit}/>}

      {isShowEdit && <EditCustomer setIsShowDetail={setIsShowDetail} setIsShowEdit={setIsShowEdit}/>}
    </>
  );
};

export default Customer;
