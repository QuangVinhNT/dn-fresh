export class ChiTietThucPhamNhap {
  private maLoHang: string;
  private maThucPham: string;
  private maPhieuNhap: string;
  private ngaySanXuat: Date;
  private hanSuDung: Date;
  private donGiaNhap: number;
  private soLuong: number;

  constructor(
    maLoHang: string,
    maThucPham: string,
    maPhieuNhap: string,
    ngaySanXuat: Date,
    hanSuDung: Date,
    donGiaNhap: number,
    soLuong: number
  ) {
    this.maLoHang = maLoHang;
    this.maThucPham = maThucPham;
    this.maPhieuNhap = maPhieuNhap;
    this.ngaySanXuat = ngaySanXuat;
    this.hanSuDung = hanSuDung;
    this.donGiaNhap = donGiaNhap;
    this.soLuong = soLuong;
  }

  public getMaLoHang(): string {
    return this.maLoHang;
  }
  public setMaLoHang(value: string): void {
    this.maLoHang = value;
  }

  public getMaThucPham(): string {
    return this.maThucPham;
  }
  public setMaThucPham(value: string): void {
    this.maThucPham = value;
  }

  public getMaPhieuNhap(): string {
    return this.maPhieuNhap;
  }
  public setMaPhieuNhap(value: string): void {
    this.maPhieuNhap = value;
  }

  public getNgaySanXuat(): Date {
    return this.ngaySanXuat;
  }
  public setNgaySanXuat(value: Date): void {
    this.ngaySanXuat = value;
  }

  public getHanSuDung(): Date {
    return this.hanSuDung;
  }
  public setHanSuDung(value: Date): void {
    this.hanSuDung = value;
  }

  public getDonGiaNhap(): number {
    return this.donGiaNhap;
  }
  public setDonGiaNhap(value: number): void {
    this.donGiaNhap = value;
  }

  public getSoLuong(): number {
    return this.soLuong;
  }
  public setSoLuong(value: number): void {
    this.soLuong = value;
  }
}
