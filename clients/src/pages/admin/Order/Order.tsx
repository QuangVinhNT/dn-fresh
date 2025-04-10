import { FilterDrawerComponent, TableComponent } from "@/components";
import { FilterType } from "@/types";
import { useState } from "react";
import { TfiExport } from "react-icons/tfi";
import './Order.scss';
import OrderDetail from "./OrderDetail/OrderDetail";

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
            <TableComponent
              headers={['Mã đơn hàng', 'Ngày tạo đơn', 'Tên khách hàng', 'Trạng thái', 'Mã phiếu xuất', 'Nhân viên giao hàng']}
              data={[
                {
                  orderCode: 'DH001',
                  orderCreateDate: '03/04/2025',
                  customerName: 'Nguyễn Văn A',
                  status: 'Đang giao dịch',
                  exportCode: 'PX001',
                  deliverCode: 'DLV001'
                },
                {
                  orderCode: 'DH001',
                  orderCreateDate: '03/04/2025',
                  customerName: 'Nguyễn Văn A',
                  status: 'Đang giao dịch',
                  exportCode: 'PX001',
                  deliverCode: 'DLV001'
                },
                {
                  orderCode: 'DH001',
                  orderCreateDate: '03/04/2025',
                  customerName: 'Nguyễn Văn A',
                  status: 'Đang giao dịch',
                  exportCode: 'PX001',
                  deliverCode: 'DLV001'
                },
                {
                  orderCode: 'DH001',
                  orderCreateDate: '03/04/2025',
                  customerName: 'Nguyễn Văn A',
                  status: 'Đang giao dịch',
                  exportCode: 'PX001',
                  deliverCode: 'DLV001'
                },
                {
                  orderCode: 'DH001',
                  orderCreateDate: '03/04/2025',
                  customerName: 'Nguyễn Văn A',
                  status: 'Đang giao dịch',
                  exportCode: 'PX001',
                  deliverCode: 'DLV001'
                }
              ]}
              setIsShowFilter={setIsShowFilter}
              searchPlaceholder="Tìm kiếm theo mã đơn hàng, tên khách hàng, nhân viên giao hàng"
              setIsShowDetail={setIsShowDetail}
            />
            <FilterDrawerComponent
              filters={filtersData}
              isShowFilter={isShowFilter}
              setIsShowFilter={setIsShowFilter} />
          </div>
        </>
      )}

      {/* Order detail */}
      {isShowDetail && <OrderDetail setIsShowDetail={setIsShowDetail} />}
    </>
  );
};

export default Order;
