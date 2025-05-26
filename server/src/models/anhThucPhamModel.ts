export class AnhThucPham {
  private maAnh: string;
  private maThucPham: string;
  private hinhAnh: string;

  constructor(maAnh: string, maThucPham: string, hinhAnh: string) {
    this.maAnh = maAnh;
    this.maThucPham = maThucPham;
    this.hinhAnh = hinhAnh;
  }

  public getMaAnh(): string {
    return this.maAnh;
  }
  public setMaAnh(value: string) {
    this.maAnh = value;
  }

  public getMaThucPham(): string {
    return this.maThucPham;
  }
  public setMaThucPham(value: string) {
    this.maThucPham = value;
  }

  public getHinhAnh(): string {
    return this.hinhAnh;
  }
  public setHinhAnh(value: string) {
    this.hinhAnh = value;
  }
}