import { pool } from "../configs/database.js";

export class NhaCungCapDAO {

  public getAll = async (page: number, limit: number, providerName: string, status: string) => {
    const offset = (page - 1) * limit;
    const whereClause = [
      providerName.length > 0 ? `BINARY LOWER(tenNhaCungCap) LIKE LOWER('%${providerName}%')` : '',
      status.length > 0 ? `nhacungcap.trangThaiHoatDong IN (${status})` : ''
    ].filter(item => item.length > 0).join(' AND ');
    try {
      const [rows] = await pool.query(`
        SELECT maNhaCungCap, tenNhaCungCap, ngayDangKy, trangThaiHoatDong
        FROM nhacungcap
        ${whereClause.length > 0 ? `WHERE ${whereClause}` : ''}
        ORDER BY tenNhaCungCap ASC
        `, [limit, offset]);

      const [total] = await pool.query(`
        SELECT COUNT(DISTINCT maNhaCungCap) as total
        FROM nhacungcap
        ${whereClause.length > 0 ? `WHERE ${whereClause}` : ''}
        `);

      return {
        data: rows,
        total
      }
    } catch (error) {
      console.error(`DAO error: ${error}`);
      throw error;
    }
  };
}
