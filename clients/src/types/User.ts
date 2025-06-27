import { DiaChi } from "./Address";

type User = {
  maNguoiDung: string;
  hoTen: string;
  gioiTinh: number;
  ngaySinh: Date;
  soDienThoai: string;
  maDiaChi: string;
  email: string;
  matKhau: string;
  hinhAnh: string;
  ngayTao: Date;
  ngayCapNhat: Date;
  trangThai: number;
  maVaiTro: string;
};

export enum UserStatus {
  'Vô hiệu hóa' = 0,
  'Hoạt động' = 1,
  'Chưa xác minh' = 2
}

export enum Role {
  'VT001' = 'Quản trị viên',
  'VT002' = 'Nhân viên kho',
  'VT003' = 'Nhân viên giao hàng',
  'VT004' = 'Khách hàng',
}

export enum Gender {
  'Nữ' = 0,
  'Nam' = 1
}

type AccountUser = Pick<User, 'hoTen' | 'hinhAnh'>;

type CustomerList = Pick<User, 'maNguoiDung' | 'hoTen' | 'ngaySinh' | 'gioiTinh' | 'email' | 'trangThai' | 'ngayTao'>;

type StaffList = Pick<User, 'maNguoiDung' | 'hoTen' | 'ngaySinh' | 'gioiTinh' | 'maVaiTro' | 'trangThai' | 'ngayTao'>;

type InsertUserPayload = Pick<User, 'hoTen' | 'gioiTinh' | 'ngaySinh' | 'soDienThoai' | 'email' | 'matKhau' | 'hinhAnh' | 'maVaiTro'> & Pick<DiaChi, 'chiTietDiaChi' | 'maPhuongXa'>;

type UpdateUserPayload = Pick<User, 'hoTen' | 'gioiTinh' | 'ngaySinh' | 'soDienThoai' | 'matKhau' | 'hinhAnh'> & Pick<DiaChi, 'chiTietDiaChi' | 'maPhuongXa'>;

type CustomerDetailType = Pick<User, 'maNguoiDung' | 'hoTen' | 'gioiTinh' | 'ngaySinh' | 'soDienThoai' | 'email' | 'hinhAnh' | 'ngayTao' | 'ngayCapNhat' | 'trangThai'> & {
  diaChi: string,
  soLuongDonHang: number,
  danhSachVaiTro: string[];
};

type StaffDetailType = Pick<User, 'maNguoiDung' | 'hoTen' | 'gioiTinh' | 'ngaySinh' | 'soDienThoai' | 'email' | 'hinhAnh' | 'ngayTao' | 'ngayCapNhat' | 'trangThai'> & {
  diaChi: string,
  danhSachVaiTro: string[];
};

type InsertUserRolePayload = Pick<User, 'maNguoiDung' | 'maVaiTro'>;

export type {
  AccountUser, CustomerList, StaffList, User, InsertUserPayload, CustomerDetailType, InsertUserRolePayload, StaffDetailType, UpdateUserPayload
};
