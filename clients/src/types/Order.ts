type Order = {
  id: string;
  createdAt: string;
  customerName: string;
  status: number;
  exportReceiptId: string;
  staffName: string;
}

export enum OrderStatus {
  'Đã hủy' = 0,
  'Hoàn thành' = 1,
  'Đóng gói' = 2,
  'Đặt hàng' = 3,
  'Xuất kho' = 4
}

type OrderList = Pick<Order, 'id' | 'createdAt' | 'customerName' | 'exportReceiptId' | 'staffName' | 'status'>

export type {
  OrderList
}
