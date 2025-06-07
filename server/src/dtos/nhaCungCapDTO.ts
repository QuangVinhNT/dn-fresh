export interface ChiTietNhaCungCapDTO {
  maNhaCungCap: string;
  tenNhaCungCap: string;
  moTa: string;
  ngayThanhLap: Date;
  ngayDangKy: Date;
  diaChi: string;
  chiTietDiaChi: string;
  maPhuongXa: string;
  maTinhThanhPho: string;
  trangThaiHoatDong: number;
  giayToPhapLy: string;
  ngayCapNhat: Date;
  danhMucCungCap: string;
  thucPhamCungCap: {
    maThucPham: string,
    tenThucPham: string,
    soLuong: number
  }[]
}
