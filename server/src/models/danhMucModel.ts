export class DanhMuc {
  private maDanhMuc: string;
  private tenDanhMuc: string;
  private moTa: string;
  private trangThai: number;
  private ngayTao: Date | null;
  private ngayCapNhat: Date | null;

  constructor(
    maDanhMuc: string,
    tenDanhMuc: string,
    moTa: string,
    trangThai: number,
    ngayTao: Date | null,
    ngayCapNhat: Date | null
  ) {
    this.maDanhMuc = maDanhMuc;
    this.tenDanhMuc = tenDanhMuc;
    this.moTa = moTa;
    this.trangThai = trangThai;
    this.ngayTao = ngayTao;
    this.ngayCapNhat = ngayCapNhat;
  }

  public getMaDanhMuc(): string {
    return this.maDanhMuc;
  }

  public setMaDanhMuc(value: string): void {
    this.maDanhMuc = value;
  }

  public getTenDanhMuc(): string {
    return this.tenDanhMuc;
  }

  public setTenDanhMuc(value: string): void {
    this.tenDanhMuc = value;
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
