import { pool } from "../configs/database.js";

interface ExportReceiptDTO {
  id: string;
  exportDate: string;
  staffId: string;
  adminId: string;
  status: number;
  createdAt: string;
  updatedAt: string;
}

const getAllExportReceipt = async (page: number, limit: number) => {
  const offset = (page - 1) * limit;
  try {
    const [rows] = await pool.query(`
      SELECT maPhieuXuat, ngayXuatHang, maNhanVien, maQuanTriVien, trangThai, ngayTao, ngayCapNhat
      FROM phieuxuat
      LIMIT ?
      OFFSET ? 
      `, [limit, offset]);
    const total = await pool.query(`
      SELECT COUNT(maPhieuXuat) as total
      FROM phieuxuat
      `);
    return {
      data: rows,
      total
    }
  } catch (error) {
    console.error(`Model error: ${error}`);
    throw error;
  }
};

export {
  ExportReceiptDTO,
  getAllExportReceipt
}
