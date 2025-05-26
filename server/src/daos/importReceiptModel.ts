import { pool } from "../configs/database.js";

interface ImportReceiptDTO {
  id: string;
  importDate: string;
  staffId: string;
  adminId: string;
  status: number;
  createdAt: string;
  updatedAt: string;
}
const getAllImportReceipt = async (page: number, limit: number) => {
  const offset = (page - 1) * limit;
  try {
    const [rows] = await pool.query(`
      SELECT maPhieuNhap, ngayNhapHang, maNhanVien, maQuanTriVien, trangThai, ngayTao, ngayCapNhat
      FROM phieunhap
      LIMIT ?
      OFFSET ?      
    `, [limit, offset]);
    const [total] = await pool.query(`
      SELECT COUNT(maPhieuNhap) as total
      FROM phieunhap
    `);
    return {
      data: rows,
      total,
    };
  } catch (error) {
    console.error(`Model error: ${error}`);
    throw error;
  }
};

export {
  ImportReceiptDTO,
  getAllImportReceipt
}
