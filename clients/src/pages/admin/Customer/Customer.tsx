import { useEffect, useState } from "react";
import './Customer.scss';
import { TfiExport } from "react-icons/tfi";
import { ButtonComponent, FilterDrawerComponent, TableComponent, TablePagination, TableSearchFilter } from "@/components";
import { IoAdd } from "react-icons/io5";
import { FilterType } from "@/types";
import AddCustomer from "./AddCustomer/AddCustomer";
import CustomerDetail from "./CustomerDetail/CustomerDetail";
import EditCustomer from "./CustomerDetail/EditCustomer/EditCustomer";
import { dateFormatter, datetimeFormatter } from "@/utils/datetimeFormatter";
import { loadingStore } from "@/store";
import { getCustomers } from "@/api/userApi";
import { CustomerList, Gender, UserStatus } from "@/types/User";

const headers = ['Mã người dùng', 'Họ tên', 'Ngày sinh', 'Giới tính', 'Email', 'Trạng thái', 'Ngày tạo'];

const filtersData: FilterType[] = [
  {
    query: 'status',
    name: 'Trạng thái',
    values: [
      {
        valueName: 'Đang giao dịch',
        value: 'trading'
      },
      {
        valueName: 'Ngừng giao dịch',
        value: 'notTrading'
      }
    ]
  },
  {
    query: 'productType',
    name: 'Phân loại',
    values: [
      {
        valueName: 'Sản phẩm thường',
        value: 'normal'
      },
      {
        valueName: 'Serial',
        value: 'serial'
      },
      {
        valueName: 'Lô - Hạn sử dụng',
        value: 'expireDate'
      },
      {
        valueName: 'Combo',
        value: 'combo'
      }
    ]
  }
];

const Customer = () => {
  const [isShowAdd, setIsShowAdd] = useState(false);
  const [isShowFilter, setIsShowFilter] = useState(false);
  const [isShowDetail, setIsShowDetail] = useState(false);
  const [isShowEdit, setIsShowEdit] = useState(false);
  const [customers, setCustomers] = useState<CustomerList[]>([])
  const [page, setPage] = useState<number>(1);
  const [limit, setLimit] = useState<number>(5);
  const [total, setTotal] = useState<number>(0);

  const { showLoading, hideLoading } = loadingStore();

  useEffect(() => {
    fetchCustomers();
  }, [limit, page]);

  const fetchCustomers = async () => {
    showLoading();
    try {
      const response = await getCustomers(page, limit);
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
            <TableSearchFilter searchPlaceholder="Tìm theo tên khách hàng, mã khách hàng" setIsShowFilter={setIsShowFilter} />
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
                      <span>{customer.id}</span>
                    </td>                    
                    <td>
                      <span>{customer.fullname}</span>
                    </td>
                    <td>
                      <span>{dateFormatter.format(new Date(customer.dob))}</span>
                    </td>
                    <td>
                      <span>{Gender[customer.gender]}</span>
                    </td>
                    <td>
                      <span>{customer.email}</span>
                    </td>
                    <td>
                      <span>{UserStatus[customer.status]}</span>
                    </td>
                    <td>
                      <span>{datetimeFormatter(customer.createdAt)}</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <TablePagination page={page} setPage={setPage} limit={limit} setLimit={setLimit} total={total}/>
            <FilterDrawerComponent filters={filtersData} isShowFilter={isShowFilter} setIsShowFilter={setIsShowFilter} />
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
