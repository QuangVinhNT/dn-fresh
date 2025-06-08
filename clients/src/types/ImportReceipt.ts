type ImportReceipt = {
  maPhieuNhap: string;
  ngayNhapHang: Date;
  ghiChu: string;
  maNhanVien: string;
  trangThai: number;
  maQuanTriVien: string;
  ngayTao: Date | null;
  ngayCapNhat: Date | null;
  maNhaCungCap: string;
};

export enum ImportReceiptStatus {
  'Đã hoàn thành' = 1,
  'Đang đợi duyệt' = 2,
  'Chưa hoàn thành' = 3,
  'Đã hủy' = 0
}

type ImportReceiptList = Pick<ImportReceipt, 'maPhieuNhap' | 'ngayNhapHang' | 'maNhanVien' | 'trangThai' | 'maQuanTriVien' | 'ngayTao' | 'ngayCapNhat'>;

type ImportReceiptDetailType = ImportReceipt & {
  tenNhanVien: string,
  tenQuanTriVien: string,
  tenNhaCungCap: string,
  danhSachThucPham: {
    maLoHang: string,
    maThucPham: string,
    tenThucPham: string,
    ngaySanXuat: string,
    hanSuDung: string,
    donGiaNhap: number,
    soLuong: number,
    donViTinh: string;
  }[];
};

type InsertImportReceiptPayload = Pick<ImportReceipt, 'ghiChu' | 'maNhaCungCap' | 'maQuanTriVien'>;

type UpdateImportReceiptPayload = Pick<ImportReceipt, 'ghiChu' | 'maNhaCungCap' | 'maQuanTriVien'>;

export type {
  ImportReceiptList, ImportReceiptDetailType, InsertImportReceiptPayload, UpdateImportReceiptPayload
};
