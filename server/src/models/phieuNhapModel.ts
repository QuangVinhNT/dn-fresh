export class PhieuNhap {
  private maPhieuNhap: string;
  private ngayNhapHang: Date | null;
  private ghiChu: string;
  private maNhanVien: string;
  private trangThai: number;
  private maQuanTriVien: string;
  private ngayTao: Date | null;
  private ngayCapNhat: Date | null;
  private maNhaCungCap: string;

  constructor(
    maPhieuNhap: string,
    ngayNhapHang: Date | null,
    ghiChu: string,
    maNhanVien: string,
    trangThai: number,
    maQuanTriVien: string,
    ngayTao: Date | null,
    ngayCapNhat: Date | null,
    maNhaCungCap: string
  ) {
    this.maPhieuNhap = maPhieuNhap;
    this.ngayNhapHang = ngayNhapHang;
    this.ghiChu = ghiChu;
    this.maNhanVien = maNhanVien;
    this.trangThai = trangThai;
    this.maQuanTriVien = maQuanTriVien;
    this.ngayTao = ngayTao;
    this.ngayCapNhat = ngayCapNhat;
    this.maNhaCungCap = maNhaCungCap;
  }

  public getMaPhieuNhap(): string {
    return this.maPhieuNhap;
  }
  public setMaPhieuNhap(value: string): void {
    this.maPhieuNhap = value;
  }

  public getNgayNhapHang(): Date | null{
    return this.ngayNhapHang;
  }
  public setNgayNhapHang(value: Date | null): void {
    this.ngayNhapHang = value;
  }

  public getGhiChu(): string {
    return this.ghiChu;
  }
  public setGhiChu(value: string): void {
    this.ghiChu = value;
  }

  public getMaNhanVien(): string {
    return this.maNhanVien;
  }
  public setMaNhanVien(value: string): void {
    this.maNhanVien = value;
  }

  public getTrangThai(): number {
    return this.trangThai;
  }
  public setTrangThai(value: number): void {
    this.trangThai = value;
  }

  public getMaQuanTriVien(): string {
    return this.maQuanTriVien;
  }
  public setMaQuanTriVien(value: string): void {
    this.maQuanTriVien = value;
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

  public getMaNhaCungCap(): string {
    return this.maNhaCungCap;
  }
  public setMaNhaCungCap(value: string): void {
    this.maNhaCungCap = value;
  }
}
