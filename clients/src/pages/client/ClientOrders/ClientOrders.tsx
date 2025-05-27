import { getOrders } from "@/api/orderApi";
import { ClientBanner, SearchComponent, TablePagination } from "@/components";
import { loadingStore } from "@/store";
import { OrderList, OrderStatus, PaymentMethod } from "@/types/Order";
import { datetimeFormatter } from "@/utils/datetimeFormatter";
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import './ClientOrders.scss';



const headers = ['Mã đơn hàng', 'Ngày tạo', 'Trạng thái', 'Phương thức thanh toán', 'Tổng tiền'];

const ClientOrders = () => {
  const [page, setPage] = useState<number>(1);
  const [limit, setLimit] = useState<number>(12);
  const [total, setTotal] = useState<number>(0);
  const [orders, setOrders] = useState<OrderList[]>();

  const keywordRef = useRef<string>('');
  const navigate = useNavigate();

  const { showLoading, hideLoading } = loadingStore();

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    showLoading();
    try {
      const response = await getOrders(page, limit, 'ND003', keywordRef.current);
      setOrders(response.data);
      setTotal(response.total);
    } catch (error) {
      console.error('Error when load product:', error);
    } finally {
      hideLoading();
    }
  };

  const handleClickRow = (id: string) => {
    navigate(`/orders/${id}`);
  };

  return (
    <div className="client-orders-component">
      <ClientBanner label="Đơn hàng" />
      <div className="client-orders-content">
        <h3>Danh sách đơn hàng của tôi</h3>
        <div className="table-component">
          <div className="search">
            <SearchComponent placeholder="Nhập mã đơn hàng..." onSearch={fetchProducts} keywordRef={keywordRef} />
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
                    <span>{OrderStatus[order.trangThai]}</span>
                  </td>
                  <td>
                    <span>{PaymentMethod[order.phuongThucThanhToan]}</span>
                  </td>
                  <td>
                    <span>{order.tongTien}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <TablePagination page={page} setPage={setPage} limit={limit} setLimit={setLimit} total={total} />
        </div>
      </div>
    </div>
  );
};

export default ClientOrders;
