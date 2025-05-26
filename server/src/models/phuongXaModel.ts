export class PhuongXa {
  private maPhuongXa: string;
  private tenPhuongXa: string;
  private maTinhThanhPho: string;

  constructor(maPhuongXa: string, tenPhuongXa: string, maTinhThanhPho: string) {
    this.maPhuongXa = maPhuongXa;
    this.tenPhuongXa = tenPhuongXa;
    this.maTinhThanhPho = maTinhThanhPho;
  }

  public getMaPhuongXa(): string {
    return this.maPhuongXa;
  }

  public setMaPhuongXa(maPhuongXa: string): void {
    this.maPhuongXa = maPhuongXa;
  }

  public getTenPhuongXa(): string {
    return this.tenPhuongXa;
  }

  public setTenPhuongXa(tenPhuongXa: string): void {
    this.tenPhuongXa = tenPhuongXa;
  }

  public getMaTinhThanhPho(): string {
    return this.maTinhThanhPho;
  }

  public setMaTinhThanhPho(maTinhThanhPho: string): void {
    this.maTinhThanhPho = maTinhThanhPho;
  }
}
