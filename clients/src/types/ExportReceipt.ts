type ExportReceipt = {
  maPhieuXuat: string;
  ngayXuatHang: Date;
  ghiChu: string;
  maNhanVien: string;
  trangThai: number;
  maQuanTriVien: string;
  ngayTao: Date | null;
  ngayCapNhat: Date | null;
};

export enum ExportReceiptStatus {
  'Đã hủy' = 0,
  'Đã hoàn thành' = 1,
  'Đang đợi duyệt' = 2,
  'Chưa hoàn thành' = 3,
}

type ExportReceiptList = Pick<ExportReceipt, 'maPhieuXuat' | 'ngayXuatHang' | 'maNhanVien' | 'trangThai' | 'maQuanTriVien' | 'ngayTao' | 'ngayCapNhat'>;

type ExportReceiptDetailType = ExportReceipt & {
  tenNhanVien: string,
  tenQuanTriVien: string,
  tenNhaCungCap: string,
  danhSachThucPham: {
    maLoHang: string,
    maThucPham: string,
    tenThucPham: string,
    soLuong: number,
    donViTinh: string;
  }[];
};

type InsertExportReceiptPayload = Pick<ExportReceipt, 'ghiChu' | 'maQuanTriVien'>;

type UpdateExportReceiptPayload = Pick<ExportReceipt, 'ghiChu' | 'maQuanTriVien'>;

type InsertProductToExportReceiptPayload = {
  maThucPham: string;
  maLoHang: string;
  soLuong: number;
}

export type {
  ExportReceiptList, InsertExportReceiptPayload, UpdateExportReceiptPayload, ExportReceiptDetailType, InsertProductToExportReceiptPayload
};
