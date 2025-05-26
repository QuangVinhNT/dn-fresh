type Order = {
  id: string;
  createdAt: string;
  customerName: string;
  status: number;
  exportReceiptId: string;
  staffName: string;

  maDonHang: string;
  maKhachHang: string;
  maDiaChi: string;
  maNhanVien: string;
  maPhieuXuat: string;
  trangThai: number;
  ngayTao: Date | null;
  ngayCapNhat: Date | null;
  ghiChu: string;
  phuongThucThanhToan: number;
  tongTien: number;
}

export enum OrderStatus {
  'Đã hủy' = 0,
  'Hoàn thành' = 1,
  'Đóng gói' = 2,
  'Đặt hàng' = 3,
  'Xuất kho' = 4
}

export enum PaymentMethod {
  'Trực tuyến' = 1,
  'Trực tiếp (COD)' = 2
}

type OrderList = Pick<Order, 'maDonHang' | 'ngayTao' | 'trangThai' | 'phuongThucThanhToan' | 'tongTien'>

export type {
  OrderList
}
