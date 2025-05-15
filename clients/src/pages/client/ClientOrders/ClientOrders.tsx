import { ClientBanner, FilterDrawerComponent, TableComponent } from "@/components";
import './ClientOrders.scss';
import { useState } from "react";
import { FilterType } from "@/types";

const filtersData: FilterType[] = [
  {
    query: 'status',
    name: 'Trạng thái',
    values: [
      {
        valueName: 'Đang vận chuyển',
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

const ClientOrders = () => {
  const [isShowFilter, setIsShowFilter] = useState(false);
  const [isShowDetail, setIsShowDetail] = useState(false);
  return (
    <div className="client-orders-component">
      <ClientBanner label="Đơn hàng" />
      <div className="client-orders-content">
        <h3>Danh sách đơn hàng của tôi</h3>
        <TableComponent
          headers={['Mã đơn hàng', 'Ngày tạo đơn', 'Trạng thái', 'Nhân viên giao hàng']}
          data={[
            {
              orderCode: 'DH001',
              orderCreateDate: '03/04/2025',              
              status: 'Đang vận chuyển',              
              deliverCode: 'Nguyễn Văn B'
            },
            {
              orderCode: 'DH001',
              orderCreateDate: '03/04/2025',              
              status: 'Đang vận chuyển',              
              deliverCode: 'Nguyễn Văn B'
            },
            {
              orderCode: 'DH001',
              orderCreateDate: '03/04/2025',              
              status: 'Đang vận chuyển',              
              deliverCode: 'Nguyễn Văn B'
            },
            {
              orderCode: 'DH001',
              orderCreateDate: '03/04/2025',              
              status: 'Đang vận chuyển',              
              deliverCode: 'Nguyễn Văn B'
            },
            {
              orderCode: 'DH001',
              orderCreateDate: '03/04/2025',              
              status: 'Đang vận chuyển',              
              deliverCode: 'Nguyễn Văn B'
            }
          ]}
          setIsShowFilter={setIsShowFilter}
          searchPlaceholder="Tìm kiếm theo mã đơn hàng"
          setIsShowDetail={setIsShowDetail}
        />
        <FilterDrawerComponent
          filters={filtersData}
          isShowFilter={isShowFilter}
          setIsShowFilter={setIsShowFilter} />
      </div>
    </div>
  );
};

export default ClientOrders;
