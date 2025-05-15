type ExportReceipt = {
  id: string;
  exportDate: string;
  note: string;
  staffId: string;
  status: number;
  adminId: string;
  createdAt: string;
  updatedAt: string;
}

export enum ExportReceiptStatus {
  'Chưa hoàn thành' = 0,
  'Đã hoàn thành' = 1,
  'Đang đợi duyệt' = 2,
  'Đã hủy' = 3
}

type ExportReceiptList = Pick<ExportReceipt, 'id' | 'exportDate' | 'staffId' | 'status' | 'adminId' | 'createdAt' | 'updatedAt'>

export type {
  ExportReceiptList
}
