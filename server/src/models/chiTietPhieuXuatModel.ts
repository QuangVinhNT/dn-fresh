export class ChiTietPhieuXuat {
  private maPhieuXuat: string;
  private maThucPham: string;
  private maLoHang: string;
  private soLuong: number;

  constructor(maPhieuXuat: string, maThucPham: string, maLoHang: string, soLuong: number) {
    this.maPhieuXuat = maPhieuXuat;
    this.maThucPham = maThucPham;
    this.maLoHang = maLoHang;
    this.soLuong = soLuong;
    }

    public getMaPhieuXuat(): string {
    return this.maPhieuXuat;
    }

    public setMaPhieuXuat(maPhieuXuat: string): void {
    this.maPhieuXuat = maPhieuXuat;
    }

    public getMaThucPham(): string {
    return this.maThucPham;
    }

    public setMaThucPham(maThucPham: string): void {
    this.maThucPham = maThucPham;
    }

    public getMaLoHang(): string {
    return this.maLoHang;
    }

    public setMaLoHang(maLoHang: string): void {
    this.maLoHang = maLoHang;
    }

    public getSoLuong(): number {
    return this.soLuong;
    }

    public setSoLuong(soLuong: number): void {
    this.soLuong = soLuong;
    }
}
