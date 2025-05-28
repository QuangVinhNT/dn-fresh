type ImportReceipt = {
  id: string;
  importDate: string;
  note: string;
  staffId: string;
  status: number;
  adminId: string;
  createdAt: string;
  updatedAt: string;
  providerId: string;

  maPhieuNhap: string;
  ngayNhapHang: Date;
  ghiChu: string;
  maNhanVien: string;
  trangThai: number;
  maQuanTriVien: string;
  ngayTao: Date | null;
  ngayCapNhat: Date | null;
  maNhaCungCap: string;
}

export enum ImportReceiptStatus {
  'Chưa hoàn thành' = 0,
  'Đã hoàn thành' = 1,
  'Đang đợi duyệt' = 2,
  'Đã hủy' = 3
}

type ImportReceiptList = Pick<ImportReceipt, 'maPhieuNhap' | 'ngayNhapHang' | 'maNhanVien' | 'trangThai' | 'maQuanTriVien' | 'ngayTao' | 'ngayCapNhat'>

export type {
  ImportReceiptList
}
