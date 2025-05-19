import { FilterDrawerComponent, TableComponent, TablePagination, TableSearchFilter } from "@/components";
import { FilterType } from "@/types";
import { useEffect, useState } from "react";
import { TfiExport } from "react-icons/tfi";
import './Order.scss';
import OrderDetail from "./OrderDetail/OrderDetail";
import { OrderList, OrderStatus } from "@/types/Order";
import { loadingStore } from "@/store";
import { getAdminOrders } from "@/api/orderApi";
import { datetimeFormatter } from "@/utils/datetimeFormatter";

const headers = ['Mã đơn hàng', 'Ngày tạo đơn', 'Khách hàng', 'Trạng thái', 'Mã phiếu xuất', 'Nhân viên giao hàng']

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

const Order = () => {
  const [isShowFilter, setIsShowFilter] = useState(false);
  const [isShowDetail, setIsShowDetail] = useState(false);
  const [orders, setOrders] = useState<OrderList[]>([])
  const [page, setPage] = useState<number>(1);
  const [limit, setLimit] = useState<number>(5);
  const [total, setTotal] = useState<number>(0);

  const { showLoading, hideLoading } = loadingStore();

  useEffect(() => {
    fetchOrders();
  }, [limit, page]);

  const fetchOrders = async () => {
    showLoading();
    try {
      const response = await getAdminOrders(page, limit);
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
            <TableSearchFilter searchPlaceholder="Tìm theo mã phiếu nhập, mã người dùng" setIsShowFilter={setIsShowFilter} />
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
                      <span>{order.id}</span>
                    </td>
                    <td>
                      <span>{datetimeFormatter(order.createdAt)}</span>
                    </td>
                    <td>
                      <span>{order.customerName}</span>
                    </td>
                    <td>
                      <span>{OrderStatus[order.status]}</span>
                    </td>
                    <td>
                      <span>{order.exportReceiptId}</span>
                    </td>
                    <td>
                      <span>{order.staffName}</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <TablePagination page={page} setPage={setPage} limit={limit} setLimit={setLimit} total={total}/>
            <FilterDrawerComponent filters={filtersData} isShowFilter={isShowFilter} setIsShowFilter={setIsShowFilter} />
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
