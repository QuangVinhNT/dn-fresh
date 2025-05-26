export class VaiTroNguoiDung {
  private maNguoiDung: string;
  private maVaiTro: string;

  constructor(maNguoiDung: string, maVaiTro: string) {
    this.maNguoiDung = maNguoiDung;
    this.maVaiTro = maVaiTro;
  }

  public getMaNguoiDung(): string {
    return this.maNguoiDung;
  }

  public setMaNguoiDung(maNguoiDung: string): void {
    this.maNguoiDung = maNguoiDung;
  }

  public getMaVaiTro(): string {
    return this.maVaiTro;
  }

  public setMaVaiTro(maVaiTro: string): void {
    this.maVaiTro = maVaiTro;
  }
}
