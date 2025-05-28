type ExportReceipt = {
  id: string;
  exportDate: string;
  note: string;
  staffId: string;
  status: number;
  adminId: string;
  createdAt: string;
  updatedAt: string;

  maPhieuXuat: string;
  ngayXuatHang: Date;
  ghiChu: string;
  maNhanVien: string;
  trangThai: number;
  maQuanTriVien: string;
  ngayTao: Date | null;
  ngayCapNhat: Date | null;
}

export enum ExportReceiptStatus {
  'Chưa hoàn thành' = 0,
  'Đã hoàn thành' = 1,
  'Đang đợi duyệt' = 2,
  'Đã hủy' = 3
}

type ExportReceiptList = Pick<ExportReceipt, 'maPhieuXuat' | 'ngayXuatHang' | 'maNhanVien' | 'trangThai' | 'maQuanTriVien' | 'ngayTao' | 'ngayCapNhat'>

export type {
  ExportReceiptList
}
