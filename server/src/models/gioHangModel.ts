export class GioHang {
  private maThucPham: string;
  private maNguoiDung: string;
  private soLuong: number;
  private ngayTao: Date | null;

  constructor(maThucPham: string, maNguoiDung: string, soLuong: number, ngayTao: Date | null = null) {
    this.maThucPham = maThucPham;
    this.maNguoiDung = maNguoiDung;
    this.soLuong = soLuong;
    this.ngayTao = ngayTao;
  }

  public getMaThucPham(): string {
    return this.maThucPham;
  }

  public setMaThucPham(maThucPham: string): void {
    this.maThucPham = maThucPham;
  }

  public getMaNguoiDung(): string {
    return this.maNguoiDung;
  }

  public setMaNguoiDung(maNguoiDung: string): void {
    this.maNguoiDung = maNguoiDung;
  }

  public getSoLuong(): number {
    return this.soLuong;
  }

  public setSoLuong(soLuong: number): void {
    this.soLuong = soLuong;
  }

  public getNgayTao(): Date | null {
    return this.ngayTao;
  }

  public setNgayTao(ngayTao: Date | null): void {
    this.ngayTao = ngayTao;
  }
}
