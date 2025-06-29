import { getOrderById, getStaffOrders } from "@/api/orderApi";
import { ButtonComponent, FilterComponent, SearchComponent, TablePagination } from "@/components";
import { loadingStore, userStore } from "@/store";
import { FilterType } from "@/types";
import { OrderDetail, OrderStatus, StaffOrderList } from "@/types/Order";
import { useEffect, useRef, useState } from "react";
import './DSOrder.scss';
import { IoFilter } from "react-icons/io5";
import { datetimeFormatter } from "@/utils/datetimeFormatter";
import DSOrderDetail from "./DSOrderDetail/DSOrderDetail";
import { getCommuneIdByUserId } from "@/api/addressApi";

const headers = ['Mã đơn hàng', 'Ngày tạo đơn', 'Khách hàng', 'Trạng thái', 'Mã phiếu xuất'];

const DSOrder = () => {
  const [isShowDetail, setIsShowDetail] = useState(false);
  const [orders, setOrders] = useState<StaffOrderList[]>([]);
  const [order, setOrder] = useState<OrderDetail>();
  const [page, setPage] = useState<number>(1);
  const [limit, setLimit] = useState<number>(5);
  const [total, setTotal] = useState<number>(0);
  const [filters, setFilters] = useState<FilterType[]>([]);

  const keywordRef = useRef<string>('');

  const { showLoading, hideLoading } = loadingStore();
  const { user } = userStore();

  useEffect(() => {
    const statusFilter = filters.find(filter => filter.name === 'status')?.value;
    fetchOrders(statusFilter);
  }, [limit, page, filters]);

  const fetchOrders = async (status?: string) => {
    showLoading();
    try {
      const workLocation = await getCommuneIdByUserId(user?.id + '');
      const response = await getStaffOrders(page, limit, keywordRef.current, workLocation.khuVuc, status);
      setOrders(response.data);
      setTotal(response.total);
    } catch (error) {
      console.error('Error when load product:', error);
    } finally {
      hideLoading();
    }
  };

  const handleClickRow = async (orderId: string) => {
    try {
      const response = await getOrderById(orderId);
      setOrder(response);
      setIsShowDetail(true);
    } catch (error) {
      console.error('Error when get product:', error);
    }
  };

  return (
    <>
      {!isShowDetail && (
        <>
          <div className="order-component">
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
                <SearchComponent placeholder="Nhập mã đơn hàng..." onSearch={fetchOrders} keywordRef={keywordRef} />
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
                      handleClickRow(order.maDonHang);
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
                        <span>{order.maPhieuXuat || <i>Chưa xuất kho</i>}</span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <TablePagination page={page} setPage={setPage} limit={limit} setLimit={setLimit} total={total} />
            </div>
          </div>
        </>
      )}

      {/* Order detail */}
      {isShowDetail && <DSOrderDetail setIsShowDetail={setIsShowDetail} detailData={order} onUpdated={fetchOrders} />}
    </>
  );
};

export default DSOrder;
