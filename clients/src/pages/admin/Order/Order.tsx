import { getAdminOrders } from "@/api/orderApi";
import { FilterComponent, SearchComponent, TablePagination } from "@/components";
import { loadingStore } from "@/store";
import { FilterType } from "@/types";
import { AdminOrderList, OrderStatus } from "@/types/Order";
import { datetimeFormatter } from "@/utils/datetimeFormatter";
import { useEffect, useRef, useState } from "react";
import { IoFilter } from "react-icons/io5";
import { TfiExport } from "react-icons/tfi";
import './Order.scss';
import OrderDetail from "./OrderDetail/OrderDetail";

const headers = ['Mã đơn hàng', 'Ngày tạo đơn', 'Khách hàng', 'Trạng thái', 'Mã phiếu xuất', 'Nhân viên giao hàng']

const Order = () => {
  const [isShowDetail, setIsShowDetail] = useState(false);
  const [orders, setOrders] = useState<AdminOrderList[]>([])
  const [page, setPage] = useState<number>(1);
  const [limit, setLimit] = useState<number>(5);
  const [total, setTotal] = useState<number>(0);
  const [filters, setFilters] = useState<FilterType[]>([]);

  const keywordRef = useRef<string>('');

  const { showLoading, hideLoading } = loadingStore();

  useEffect(() => {
    const statusFilter = filters.find(filter => filter.name === 'status')?.value;
    fetchOrders(statusFilter);
  }, [limit, page, filters]);

  const fetchOrders = async (status?: string) => {
    showLoading();
    try {
      const response = await getAdminOrders(page, limit, keywordRef.current, status);
      setOrders(response.data);
      setTotal(response.total);
    } catch (error) {
      console.error('Error when load product:', error);
    } finally {
      hideLoading();
    }
  };

  return (
    <>
      {!isShowDetail && (
        <>
          <div className="order-component">
            <div className="order-tool">
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
                      name: 'Đã hủy',
                      value: 0,
                    },
                    {
                      name: 'Đặt hàng',
                      value: 1,
                    },
                    {
                      name: 'Đóng gói',
                      value: 2,
                    },
                    {
                      name: 'Xuất kho',
                      value: 3,
                    },
                    {
                      name: 'Hoàn thành',
                      value: 4
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
              <SearchComponent placeholder="Nhập tên nhà cung cấp..." onSearch={fetchOrders} keywordRef={keywordRef} />
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
                {orders?.map((order, idx) => (
                  <tr key={idx} className="tb-body-row" onClick={() => { 
                    // handleClickRow(product.id); 
                    }}>
                    <td style={{ padding: '10px 0 10px 20px', textAlign: 'justify' }}>
                      <span>{order.maDonHang}</span>
                    </td>
                    <td>
                      <span>{datetimeFormatter(order.ngayTao + '')}</span>
                    </td>
                    <td>
                      <span>{order.nguoiNhan}</span>
                    </td>
                    <td>
                      <span>{OrderStatus[order.trangThai]}</span>
                    </td>
                    <td>
                      <span>{order.maPhieuXuat}</span>
                    </td>
                    <td>
                      <span>{order.tenNhanVien}</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <TablePagination page={page} setPage={setPage} limit={limit} setLimit={setLimit} total={total}/>
          </div>
          </div>
        </>
      )}

      {/* Order detail */}
      {isShowDetail && <OrderDetail setIsShowDetail={setIsShowDetail} />}
    </>
  );
};

export default Order;
