export class NhaCungCap {
  private maNhaCungCap: string;
  private tenNhaCungCap: string;
  private moTa: string;
  private ngayThanhLap: Date;
  private ngayDangKy: Date | null;
  private maDiaChi: string;
  private trangThaiHoatDong: number;
  private giayToPhapLy: string;
  private ngayCapNhat: Date | null;

  constructor(
    maNhaCungCap: string,
    tenNhaCungCap: string,
    moTa: string,
    ngayThanhLap: Date,
    ngayDangKy: Date | null,
    maDiaChi: string,
    trangThaiHoatDong: number,
    giayToPhapLy: string,
    ngayCapNhat: Date | null
  ) {
    this.maNhaCungCap = maNhaCungCap;
    this.tenNhaCungCap = tenNhaCungCap;
    this.moTa = moTa;
    this.ngayThanhLap = ngayThanhLap;
    this.ngayDangKy = ngayDangKy;
    this.maDiaChi = maDiaChi;
    this.trangThaiHoatDong = trangThaiHoatDong;
    this.giayToPhapLy = giayToPhapLy;
    this.ngayCapNhat = ngayCapNhat;
  }

  public getMaNhaCungCap(): string {
    return this.maNhaCungCap;
  }
  public setMaNhaCungCap(value: string): void {
    this.maNhaCungCap = value;
  }

  public getTenNhaCungCap(): string {
    return this.tenNhaCungCap;
  }
  public setTenNhaCungCap(value: string): void {
    this.tenNhaCungCap = value;
  }

  public getMoTa(): string {
    return this.moTa;
  }
  public setMoTa(value: string): void {
    this.moTa = value;
  }

  public getNgayThanhLap(): Date {
    return this.ngayThanhLap;
  }
  public setNgayThanhLap(value: Date): void {
    this.ngayThanhLap = value;
  }

  public getNgayDangKy(): Date | null {
    return this.ngayDangKy;
  }
  public setNgayDangKy(value: Date | null): void {
    this.ngayDangKy = value;
  }

  public getMaDiaChi(): string {
    return this.maDiaChi;
  }
  public setMaDiaChi(value: string): void {
    this.maDiaChi = value;
  }

  public getTrangThaiHoatDong(): number {
    return this.trangThaiHoatDong;
  }
  public setTrangThaiHoatDong(value: number): void {
    this.trangThaiHoatDong = value;
  }

  public getGiayToPhapLy(): string {
    return this.giayToPhapLy;
  }
  public setGiayToPhapLy(value: string): void {
    this.giayToPhapLy = value;
  }

  public getNgayCapNhat(): Date | null {
    return this.ngayCapNhat;
  }
  public setNgayCapNhat(value: Date | null): void {
    this.ngayCapNhat = value;
  }
}
