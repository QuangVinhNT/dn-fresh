export class LichLamViec {
  private maNhanVien: string;
  private maQuanTriVien: string;
  private maCaLam: string;
  private ngayLamViec: Date;
  private khuVuc: string;
  private ngayTao: Date | null;
  private ngayCapNhat: Date | null;

  constructor(
    maNhanVien: string,
    maQuanTriVien: string,
    maCaLam: string,
    ngayLamViec: Date,
    khuVuc: string,
    ngayTao: Date | null = null,
    ngayCapNhat: Date | null = null
  ) {
    this.maNhanVien = maNhanVien;
    this.maQuanTriVien = maQuanTriVien;
    this.maCaLam = maCaLam;
    this.ngayLamViec = ngayLamViec;
    this.khuVuc = khuVuc;
    this.ngayTao = ngayTao;
    this.ngayCapNhat = ngayCapNhat;
  }

  public getMaNhanVien(): string {
    return this.maNhanVien;
  }
  public setMaNhanVien(value: string): void {
    this.maNhanVien = value;
  }

  public getMaQuanTriVien(): string {
    return this.maQuanTriVien;
  }
  public setMaQuanTriVien(value: string): void {
    this.maQuanTriVien = value;
  }

  public getMaCaLam(): string {
    return this.maCaLam;
  }
  public setMaCaLam(value: string): void {
    this.maCaLam = value;
  }

  public getNgayLamViec(): Date {
    return this.ngayLamViec;
  }
  public setNgayLamViec(value: Date): void {
    this.ngayLamViec = value;
  }

  public getKhuVuc(): string {
    return this.khuVuc;
  }
  public setKhuVuc(value: string): void {
    this.khuVuc = value;
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
