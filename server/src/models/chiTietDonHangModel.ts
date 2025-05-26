export class ChiTietDonHang {
  private maDonHang: string;
  private maThucPham: string;
  private soLuong: number;

  constructor(maDonHang: string, maThucPham: string, soLuong: number) {
    this.maDonHang = maDonHang;
    this.maThucPham = maThucPham;
    this.soLuong = soLuong;
  }

  public getMaDonHang(): string {
    return this.maDonHang;
  }

  public setMaDonHang(maDonHang: string): void {
    this.maDonHang = maDonHang;
  }

  public getMaThucPham(): string {
    return this.maThucPham;
  }

  public setMaThucPham(maThucPham: string): void {
    this.maThucPham = maThucPham;
  }

  public getSoLuong(): number {
    return this.soLuong;
  }

  public setSoLuong(soLuong: number): void {
    this.soLuong = soLuong;
  }
}
