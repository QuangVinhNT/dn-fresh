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
