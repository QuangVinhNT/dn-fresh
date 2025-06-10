type ImportReceiptDetail = {
  maLoHang: string;
  maThucPham: string;
  maPhieuNhap: string;
  ngaySanXuat: Date;
  hanSuDung: Date;
  donGiaNhap: number;
  soLuong: number;
}

type InsertProductToImportReceiptPayload = Omit<ImportReceiptDetail, 'maPhieuNhap' | 'maLoHang'>

type UpdateProductToImportReceiptPayload = Omit<ImportReceiptDetail, 'maLoHang'>

export type {
  InsertProductToImportReceiptPayload, UpdateProductToImportReceiptPayload
}
