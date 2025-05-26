export class NguoiDung {
  private maNguoiDung: string;
  private hoTen: string;
  private gioiTinh: number;
  private ngaySinh: Date;
  private soDienThoai: string;
  private maDiaChi: string;
  private email: string;
  private matKhau: string;
  private hinhAnh: string;
  private ngayTao: Date | null;
  private ngayCapNhat: Date | null;
  private trangThai: number;

  constructor(
    maNguoiDung: string,
    hoTen: string,
    gioiTinh: number,
    ngaySinh: Date,
    soDienThoai: string,
    maDiaChi: string,
    email: string,
    matKhau: string,
    hinhAnh: string,
    ngayTao: Date | null,
    ngayCapNhat: Date | null,
    trangThai: number
  ) {
    this.maNguoiDung = maNguoiDung;
    this.hoTen = hoTen;
    this.gioiTinh = gioiTinh;
    this.ngaySinh = ngaySinh;
    this.soDienThoai = soDienThoai;
    this.maDiaChi = maDiaChi;
    this.email = email;
    this.matKhau = matKhau;
    this.hinhAnh = hinhAnh;
    this.ngayTao = ngayTao;
    this.ngayCapNhat = ngayCapNhat;
    this.trangThai = trangThai;
  }

  public getMaNguoiDung(): string {
    return this.maNguoiDung;
  }
  public setMaNguoiDung(value: string): void {
    this.maNguoiDung = value;
  }

  public getHoTen(): string {
    return this.hoTen;
  }
  public setHoTen(value: string): void {
    this.hoTen = value;
  }

  public getGioiTinh(): number {
    return this.gioiTinh;
  }
  public setGioiTinh(value: number): void {
    this.gioiTinh = value;
  }

  public getNgaySinh(): Date {
    return this.ngaySinh;
  }
  public setNgaySinh(value: Date): void {
    this.ngaySinh = value;
  }

  public getSoDienThoai(): string {
    return this.soDienThoai;
  }
  public setSoDienThoai(value: string): void {
    this.soDienThoai = value;
  }

  public getMaDiaChi(): string {
    return this.maDiaChi;
  }
  public setMaDiaChi(value: string): void {
    this.maDiaChi = value;
  }

  public getEmail(): string {
    return this.email;
  }
  public setEmail(value: string): void {
    this.email = value;
  }

  public getMatKhau(): string {
    return this.matKhau;
  }
  public setMatKhau(value: string): void {
    this.matKhau = value;
  }

  public getHinhAnh(): string {
    return this.hinhAnh;
  }
  public setHinhAnh(value: string): void {
    this.hinhAnh = value;
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

  public getTrangThai(): number {
    return this.trangThai;
  }
  public setTrangThai(value: number): void {
    this.trangThai = value;
  }
}
