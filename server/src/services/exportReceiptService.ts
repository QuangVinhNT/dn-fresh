import { RowDataPacket } from "mysql2";
import * as ExportReceiptModel from '../daos/exportReceiptModel.js'

const getAllExportReceipt = async (page: number, limit: number) => {
  try {
    const rows = await ExportReceiptModel.getAllExportReceipt(page, limit);
    const data = (rows.data as RowDataPacket[]).map((row): ExportReceiptModel.ExportReceiptDTO => ({
      id: row.maPhieuXuat,
      exportDate: row.ngayXuatHang,
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
}

export {
  getAllExportReceipt
}
