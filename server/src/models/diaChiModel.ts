export class DiaChi {
  private maDiaChi: string;
  private chiTietDiaChi: string;
  private maPhuongXa: string;

  constructor(maDiaChi: string, chiTietDiaChi: string, maPhuongXa: string) {
    this.maDiaChi = maDiaChi;
    this.chiTietDiaChi = chiTietDiaChi;
    this.maPhuongXa = maPhuongXa;
  }

  public getMaDiaChi(): string {
    return this.maDiaChi;
  }

  public setMaDiaChi(maDiaChi: string): void {
    this.maDiaChi = maDiaChi;
  }

  public getChiTietDiaChi(): string {
    return this.chiTietDiaChi;
  }

  public setChiTietDiaChi(chiTietDiaChi: string): void {
    this.chiTietDiaChi = chiTietDiaChi;
  }

  public getMaPhuongXa(): string {
    return this.maPhuongXa;
  }

  public setMaPhuongXa(maPhuongXa: string): void {
    this.maPhuongXa = maPhuongXa;
  }
}
