import { ProductList } from "./Product";
import { User } from "./User";

type Order = {
  maDonHang: string;
  maKhachHang: string;
  nguoiNhan: string;
  maDiaChi: string;
  diaChiNhan: string;
  maNhanVien: string;
  tenNhanVien: string;
  maPhieuXuat: string;
  trangThai: number;
  ngayTao: Date;
  ngayCapNhat: Date;
  ghiChu: string;
  phuongThucThanhToan: number;
  tongTien: number;
  chiTietDiaChi: string;
  maPhuongXa: string;
  chiTietDonHang: (ProductList & { soLuong: number; })[];
};

export enum OrderStatus {
  'Đã hủy' = 0,
  'Đặt hàng' = 1,
  'Đóng gói' = 2,
  'Xuất kho' = 3,
  'Hoàn thành' = 4
}

export enum PaymentMethod {
  'Trực tuyến' = 1,
  'Trực tiếp (COD)' = 2
}

type OrderProduct = {
  maThucPham: string;
  tenThucPham: string;
  soLuong: number;
  giaTien: number;
  tiLeKhuyenMai: number;
  donViTinh: string;
  hinhAnh: string;
  tenDanhMuc: string;
};

type OrderList = Pick<Order, 'maDonHang' | 'ngayTao' | 'trangThai' | 'phuongThucThanhToan' | 'tongTien'>;

type OrderDetail = Pick<Order, 'maDonHang' | 'nguoiNhan' | 'diaChiNhan' | 'ngayTao' | 'ngayCapNhat' | 'trangThai' | 'phuongThucThanhToan' | 'ghiChu' | 'tongTien'> & {
  thongTinThucPham: OrderProduct[];
};

type InsertOrderPayload = Pick<Order, 'maKhachHang' | 'ghiChu' | 'phuongThucThanhToan' | 'chiTietDiaChi' | 'maPhuongXa' | 'chiTietDonHang'>;

type AdminOrderList = Pick<Order, 'maDonHang' | 'ngayTao' | 'nguoiNhan' | 'trangThai' | 'maPhieuXuat' | 'tenNhanVien'>;

type StaffOrderList = Pick<Order, 'maDonHang' | 'ngayTao' | 'nguoiNhan' | 'trangThai' | 'maPhieuXuat'>;


type AdminOrderDetail = Pick<Order, 'maDonHang' | 'diaChiNhan' | 'maPhieuXuat' | 'trangThai' | 'ngayTao' | 'ngayCapNhat' | 'ghiChu' | 'phuongThucThanhToan' | 'tongTien'> & {
  thongTinKhachHang: Pick<User, 'maNguoiDung' | 'hoTen' | 'gioiTinh' | 'soDienThoai' | 'email'> & { diaChi: string; },
  thongTinNhanVien: Pick<User, 'maNguoiDung' | 'hoTen'>,
  thongTinThucPham: OrderProduct[];
};

type ReadyOrder = {
  maDonHang: string;
  danhSachThucPham: {
    maThucPham: string;
    tenThucPham: string;
    soLuong: number;
    donViTinh: string;
  }[];
};

export type {
  OrderList,
  OrderDetail,
  AdminOrderList,
  InsertOrderPayload,
  AdminOrderDetail,
  ReadyOrder,
  StaffOrderList
};
