import { pool } from "../configs/database.js";

export class PhieuXuatDAO {

  public getAll = async (page: number, limit: number, exportReceiptId: string, status?: string) => {
    const offset = (page - 1) * limit;
    const whereClause = [
      exportReceiptId.length > 0 ? `BINARY LOWER(maPhieuXuat) LIKE LOWER('%${exportReceiptId}%')` : '',
      status ? `phieuxuat.trangThai = ${status}` : ''
    ].filter(item => item.length > 0).join(' AND ');
    try {
      const [rows] = await pool.query(`
      SELECT maPhieuXuat, ngayXuatHang, maNhanVien, maQuanTriVien, trangThai, ngayTao, ngayCapNhat
      FROM phieuxuat
      ${whereClause.length > 0 ? `WHERE ${whereClause}` : ''}
      LIMIT ?
      OFFSET ? 
      `, [limit, offset]);
      const total = await pool.query(`
      SELECT COUNT(DISTINCT maPhieuXuat) as total
      FROM phieuxuat
      ${whereClause.length > 0 ? `WHERE ${whereClause}` : ''}
      `);
      return {
        data: rows,
        total
      };
    } catch (error) {
      console.error(`Model error: ${error}`);
      throw error;
    }
  };
}
