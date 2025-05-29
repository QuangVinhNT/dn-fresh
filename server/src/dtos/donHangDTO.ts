import { NguoiDungDTO } from "./nguoiDungDTO.js";

export interface DonHangDTO {
  maDonHang: string;
  nguoiNhan: string;
  diaChiNhan: string;
  ngayTao: Date;
  ngayCapNhat: Date;
  trangThai: number;
  phuongThucThanhToan: number;
  ghiChu: string;
  thongTinThucPham: ThucPhamDonHangDTO[];
  tongTien: number;
}

export interface DonHangAdminDTO {
  maDonHang: string;
  thongTinKhachHang: Pick<NguoiDungDTO, 'maNguoiDung' | 'hoTen' | 'gioiTinh' | 'soDienThoai' | 'email'> & {diaChi: string};
  diaChiNhan: string;
  thongTinNhanVien: Pick<NguoiDungDTO, 'maNguoiDung' | 'hoTen'>;
  maPhieuXuat: string;
  trangThai: number;
  ngayTao: Date;
  ngayCapNhat: Date;
  ghiChu: string;
  phuongThucThanhToan: number;
  thongTinThucPham: ThucPhamDonHangDTO[];
  tongTien: number;
}

export interface ThucPhamDonHangDTO {
  maThucPham: string;
  tenThucPham: string;
  soLuong: number;
  giaTien: number;
  tiLeKhuyenMai: number;
  donViTinh: string;
  hinhAnh: string;
  tenDanhMuc: string;
}
