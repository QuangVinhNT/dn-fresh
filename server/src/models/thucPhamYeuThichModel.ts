export class ThucPhamYeuThich {
  private maNguoiDung: string;
  private maThucPham: string;
  private ngayTao: Date | null;

  constructor(maNguoiDung: string, maThucPham: string, ngayTao: Date | null = null) {
    this.maNguoiDung = maNguoiDung;
    this.maThucPham = maThucPham;
    this.ngayTao = ngayTao;
  }

  public getMaNguoiDung(): string {
    return this.maNguoiDung;
  }

  public setMaNguoiDung(maNguoiDung: string): void {
    this.maNguoiDung = maNguoiDung;
  }

  public getMaThucPham(): string {
    return this.maThucPham;
  }

  public setMaThucPham(maThucPham: string): void {
    this.maThucPham = maThucPham;
  }

  public getNgayTao(): Date | null {
    return this.ngayTao;
  }

  public setNgayTao(ngayTao: Date | null): void {
    this.ngayTao = ngayTao;
  }
}
