export class KhoThucPham {
  private maThucPham: string;
  private tenThucPham: string;
  private donGia: number;
  private moTa: string;
  private trangThai: number;
  private maDanhMuc: string;
  private tiLeKhuyenMai: number;
  private ngayTao: Date;
  private ngayCapNhat: Date;
  private soLuongTonKho: number;
  private donViTinh: string;
  private soLuongChoXuat: number;

  constructor (
    maThucPham: string,
    tenThucPham: string,
    donGia: number,
    moTa: string,
    trangThai: number,
    maDanhMuc: string,
    tiLeKhuyenMai: number,
    ngayTao: Date,
    ngayCapNhat: Date,
    soLuongTonKho: number,
    donViTinh: string,
    soLuongChoXuat: number
  ) {
    this.maThucPham = maThucPham;
    this.tenThucPham = tenThucPham;
    this.donGia = donGia;
    this.moTa = moTa;
    this.trangThai = trangThai;
    this.maDanhMuc = maDanhMuc;
    this.tiLeKhuyenMai = tiLeKhuyenMai;
    this.ngayTao = ngayTao;
    this.ngayCapNhat = ngayCapNhat;
    this.soLuongTonKho = soLuongTonKho;
    this.donViTinh = donViTinh;
    this.soLuongChoXuat = soLuongChoXuat;
  }

  public getMaThucPham(): string {
    return this.maThucPham;
  }
  public setMaThucPham(value: string): void {
    this.maThucPham = value;
  }

  public getTenThucPham(): string {
    return this.tenThucPham;
  }
  public setTenThucPham(value: string): void {
    this.tenThucPham = value;
  }

  public getDonGia(): number {
    return this.donGia;
  }
  public setDonGia(value: number): void {
    this.donGia = value;
  }

  public getMoTa(): string {
    return this.moTa;
  }
  public setMoTa(value: string): void {
    this.moTa = value;
  }

  public getTrangThai(): number {
    return this.trangThai;
  }
  public setTrangThai(value: number): void {
    this.trangThai = value;
  }

  public getMaDanhMuc(): string {
    return this.maDanhMuc;
  }
  public setMaDanhMuc(value: string): void {
    this.maDanhMuc = value;
  }

  public getTiLeKhuyenMai(): number {
    return this.tiLeKhuyenMai;
  }
  public setTiLeKhuyenMai(value: number): void {
    this.tiLeKhuyenMai = value;
  }

  public getNgayTao(): Date {
    return this.ngayTao;
  }
  public setNgayTao(value: Date): void {
    this.ngayTao = value;
  }

  public getNgayCapNhat(): Date {
    return this.ngayCapNhat;
  }
  public setNgayCapNhat(value: Date): void {
    this.ngayCapNhat = value;
  }

  public getSoLuongTonKho(): number {
    return this.soLuongTonKho;
  }
  public setSoLuongTonKho(value: number): void {
    this.soLuongTonKho = value;
  }

  public getDonViTinh(): string {
    return this.donViTinh;
  }
  public setDonViTinh(value: string): void {
    this.donViTinh = value;
  }

  public getSoLuongChoXuat(): number {
    return this.soLuongChoXuat;
  }
  public setSoLuongChoXuat(value: number): void {
    this.soLuongChoXuat = value;
  }
}
