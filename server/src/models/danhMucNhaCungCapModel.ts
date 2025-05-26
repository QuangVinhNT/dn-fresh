export class DanhMucNhaCungCap {
  private maNhaCungCap: string;
  private maDanhMuc: string;

  constructor(maNhaCungCap: string, maDanhMuc: string) {
    this.maNhaCungCap = maNhaCungCap;
    this.maDanhMuc = maDanhMuc;
  }

  public getMaNhaCungCap(): string {
    return this.maNhaCungCap;
  }

  public setMaNhaCungCap(maNhaCungCap: string): void {
    this.maNhaCungCap = maNhaCungCap;
  }

  public getMaDanhMuc(): string {
    return this.maDanhMuc;
  }

  public setMaDanhMuc(maDanhMuc: string): void {
    this.maDanhMuc = maDanhMuc;
  }
}
