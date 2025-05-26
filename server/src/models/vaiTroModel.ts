export class VaiTro {
  private maVaiTro: string;
  private tenVaiTro: string;
  private moTa: string;

  constructor(maVaiTro: string, tenVaiTro: string, moTa: string) {
    this.maVaiTro = maVaiTro;
    this.tenVaiTro = tenVaiTro;
    this.moTa = moTa;
  }

  public getMaVaiTro(): string {
    return this.maVaiTro;
  }

  public setMaVaiTro(maVaiTro: string): void {
    this.maVaiTro = maVaiTro;
  }

  public getTenVaiTro(): string {
    return this.tenVaiTro;
  }

  public setTenVaiTro(tenVaiTro: string): void {
    this.tenVaiTro = tenVaiTro;
  }

  public getMoTa(): string {
    return this.moTa;
  }

  public setMoTa(moTa: string): void {
    this.moTa = moTa;
  }
}
