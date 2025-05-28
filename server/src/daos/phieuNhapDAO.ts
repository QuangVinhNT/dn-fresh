import { pool } from "../configs/database.js";

export class PhieuNhapDAO {
  public async getAll(page: number, limit: number, importReceiptId: string, status: string) {
    const offset = (page - 1) * limit;
    const whereClause = [
      importReceiptId.length > 0 ? `BINARY LOWER(maPhieuNhap) LIKE LOWER('%${importReceiptId}%')` : '',
      status.length > 0 ? `phieunhap.trangThai IN (${status})` : ''
    ].filter(item => item.length > 0).join(' AND ');
    try {
      const [rows] = await pool.query(`
      SELECT maPhieuNhap, ngayNhapHang, maNhanVien, maQuanTriVien, trangThai, ngayTao, ngayCapNhat
      FROM phieunhap
      ${whereClause.length > 0 ? `WHERE ${whereClause}` : ''}
      ORDER BY phieunhap.ngayNhapHang DESC
      LIMIT ?
      OFFSET ?      
    `, [limit, offset]);

    const [total] = await pool.query(`
      SELECT COUNT(DISTINCT maPhieuNhap) as total
      FROM phieunhap
      ${whereClause.length > 0 ? `WHERE ${whereClause}` : ''}
    `);
    return {
      data: rows,
      total,
    };
    } catch (error) {
      console.error(`DAO error: ${error}`);
      throw error;      
    }
  }
}
