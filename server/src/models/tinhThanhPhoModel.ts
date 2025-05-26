export class TinhThanhPho {
  private maTinhThanhPho: string;
  private tenTinhThanhPho: string;

  constructor(maTinhThanhPho: string, tenTinhThanhPho: string) {
    this.maTinhThanhPho = maTinhThanhPho;
    this.tenTinhThanhPho = tenTinhThanhPho;
  }

  public getMaTinhThanhPho(): string {
    return this.maTinhThanhPho;
  }

  public setMaTinhThanhPho(maTinhThanhPho: string): void {
    this.maTinhThanhPho = maTinhThanhPho;
  }

  public getTenTinhThanhPho(): string {
    return this.tenTinhThanhPho;
  }

  public setTenTinhThanhPho(tenTinhThanhPho: string): void {
    this.tenTinhThanhPho = tenTinhThanhPho;
  }
}
