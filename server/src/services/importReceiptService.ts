import { RowDataPacket } from "mysql2";
import * as ImportReceiptModel from '../models/importReceiptModel.js';

const getAllImportReceipt = async (page: number, limit: number) => {
  try {
    const rows = await ImportReceiptModel.getAllImportReceipt(page, limit);
    const data = (rows.data as RowDataPacket[]).map((row): ImportReceiptModel.ImportReceiptDTO => ({
      id: row.maPhieuNhap,
      importDate: row.ngayNhapHang,
      staffId: row.maNhanVien,
      adminId: row.maQuanTriVien,
      status: row.trangThai,
      createdAt: row.ngayTao,
      updatedAt: row.ngayCapNhat
    }));
    const total = rows.total as RowDataPacket[];
    return {
      data,
      total: total[0].total
    };
  } catch (error) {
    console.error(`Service error: ${error}`);
    throw error;
  }
};

export {
  getAllImportReceipt
}
