export class PhieuXuat {
  private maPhieuXuat: string;
  private ngayXuatHang: Date | null;
  private ghiChu: string;
  private maNhanVien: string;
  private trangThai: number;
  private maQuanTriVien: string;
  private ngayTao: Date | null;
  private ngayCapNhat: Date | null;

  constructor(
    maPhieuXuat: string,
    ngayXuatHang: Date | null,
    ghiChu: string,
    maNhanVien: string,
    trangThai: number,
    maQuanTriVien: string,
    ngayTao: Date | null,
    ngayCapNhat: Date | null
  ) {
    this.maPhieuXuat = maPhieuXuat;
    this.ngayXuatHang = ngayXuatHang;
    this.ghiChu = ghiChu;
    this.maNhanVien = maNhanVien;
    this.trangThai = trangThai;
    this.maQuanTriVien = maQuanTriVien;
    this.ngayTao = ngayTao;
    this.ngayCapNhat = ngayCapNhat;
  }

  public getMaPhieuXuat(): string {
    return this.maPhieuXuat;
  }
  public setMaPhieuXuat(value: string): void {
    this.maPhieuXuat = value;
  }

  public getNgayXuatHang(): Date | null {
    return this.ngayXuatHang;
  }
  public setNgayXuatHang(value: Date | null): void {
    this.ngayXuatHang = value;
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
}
