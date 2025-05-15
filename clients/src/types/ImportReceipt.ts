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
}

export enum ImportReceiptStatus {
  'Chưa hoàn thành' = 0,
  'Đã hoàn thành' = 1,
  'Đang đợi duyệt' = 2,
  'Đã hủy' = 3
}

type ImportReceiptList = Pick<ImportReceipt, 'id' | 'importDate' | 'staffId' | 'status' | 'adminId' | 'createdAt' | 'updatedAt'>

export type {
  ImportReceiptList
}
