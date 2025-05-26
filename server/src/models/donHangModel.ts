export class DonHang {
  private maDonHang: string;
  private maKhachHang: string;
  private maDiaChi: string;
  private maNhanVien: string;
  private maPhieuXuat: string;
  private trangThai: number;
  private ngayTao: Date | null;
  private ngayCapNhat: Date | null;
  private ghiChu: string;
  private phuongThucThanhToan: number;

  constructor(
    maDonHang: string,
    maKhachHang: string,
    maDiaChi: string,
    maNhanVien: string,
    maPhieuXuat: string,
    trangThai: number,
    ngayTao: Date | null,
    ngayCapNhat: Date | null,
    ghiChu: string,
    phuongThucThanhToan: number
  ) {
    this.maDonHang = maDonHang;
    this.maKhachHang = maKhachHang;
    this.maDiaChi = maDiaChi;
    this.maNhanVien = maNhanVien;
    this.maPhieuXuat = maPhieuXuat;
    this.trangThai = trangThai;
    this.ngayTao = ngayTao;
    this.ngayCapNhat = ngayCapNhat;
    this.ghiChu = ghiChu;
    this.phuongThucThanhToan = phuongThucThanhToan;
  }

  public getMaDonHang(): string {
    return this.maDonHang;
  }
  public setMaDonHang(value: string): void {
    this.maDonHang = value;
  }

  public getMaKhachHang(): string {
    return this.maKhachHang;
  }
  public setMaKhachHang(value: string): void {
    this.maKhachHang = value;
  }

  public getMaDiaChi(): string {
    return this.maDiaChi;
  }
  public setMaDiaChi(value: string): void {
    this.maDiaChi = value;
  }

  public getMaNhanVien(): string {
    return this.maNhanVien;
  }
  public setMaNhanVien(value: string): void {
    this.maNhanVien = value;
  }

  public getMaPhieuXuat(): string {
    return this.maPhieuXuat;
  }
  public setMaPhieuXuat(value: string): void {
    this.maPhieuXuat = value;
  }

  public getTrangThai(): number {
    return this.trangThai;
  }
  public setTrangThai(value: number): void {
    this.trangThai = value;
  }

  public getNgayTao(): Date | null {
    return this.ngayTao;
  }
  public setNgayTao(value: Date | null): void {
    this.ngayTao = value;
  }

  public getNgayCapNhat(): Date | null {
    return this.ngayCapNhat;
  }
  public setNgayCapNhat(value: Date | null): void {
    this.ngayCapNhat = value;
  }

  public getGhiChu(): string {
    return this.ghiChu;
  }
  public setGhiChu(value: string): void {
    this.ghiChu = value;
  }

  public getPhuongThucThanhToan(): number {
    return this.phuongThucThanhToan;
  }
  public setPhuongThucThanhToan(value: number): void {
    this.phuongThucThanhToan = value;
  }
}
