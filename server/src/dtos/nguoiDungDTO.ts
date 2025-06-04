export interface NguoiDungDTO {
  maNguoiDung: string;
  hoTen: string;
  gioiTinh: number;
  ngaySinh: Date;
  soDienThoai: string;
  maDiaChi: string;
  email: string;
  matKhau: string;
  hinhAnh: string;
  ngayTao: Date | null;
  ngayCapNhat: Date | null;
  trangThai: number;
}

export interface KhachHangDTO {
  maNguoiDung: string;
  hoTen: string;
  gioiTinh: number;
  ngaySinh: Date;
  soDienThoai: string;
  diaChi: string;
  email: string;
  hinhAnh: string;
  ngayTao: Date | null;
  ngayCapNhat: Date | null;
  trangThai: number;
  soLuongDonHang: number;
  danhSachVaiTro: string[];
}

export interface NhanVienDTO {
  maNguoiDung: string;
  hoTen: string;
  gioiTinh: number;
  ngaySinh: Date;
  soDienThoai: string;
  diaChi: string;
  email: string;
  hinhAnh: string;
  ngayTao: Date | null;
  ngayCapNhat: Date | null;
  trangThai: number;
  danhSachVaiTro: string[];
}
