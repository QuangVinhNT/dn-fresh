export class CaLamViec {
  private maCaLam: string;
  private thoiGianBatDau: Date;
  private thoiGianKetThuc: Date;

  constructor(maCaLam: string, thoiGianBatDau: Date, thoiGianKetThuc: Date) {
    this.maCaLam = maCaLam;
    this.thoiGianBatDau = thoiGianBatDau;
    this.thoiGianKetThuc = thoiGianKetThuc;
  }

  public getMaCaLam(): string {
    return this.maCaLam;
  }

  public setMaCaLam(maCaLam: string): void {
    this.maCaLam = maCaLam;
  }

  public getThoiGianBatDau(): Date {
    return this.thoiGianBatDau;
  }

  public setThoiGianBatDau(thoiGianBatDau: Date): void {
    this.thoiGianBatDau = thoiGianBatDau;
  }

  public getThoiGianKetThuc(): Date {
    return this.thoiGianKetThuc;
  }

  public setThoiGianKetThuc(thoiGianKetThuc: Date): void {
    this.thoiGianKetThuc = thoiGianKetThuc;
  }
}
