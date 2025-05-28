import { pool } from "../configs/database.js";

export class DanhMucDAO {

  public getAll = async (page: number, limit: number, categoryName: string, status: string) => {
    const offset = (page - 1) * limit;
    const whereClause = [
      categoryName.length > 0 ? `BINARY LOWER(tenDanhMuc) LIKE LOWER('%${categoryName}%')` : '',
      status.length > 0 ? `danhmuc.trangThai IN (${status})` : ''
    ].filter(item => item.length > 0).join(' AND ');
    try {
      const [rows] = await pool.query(`
      SELECT danhmuc.maDanhMuc, tenDanhMuc, danhmuc.trangThai, danhmuc.ngayTao, COUNT(maThucPham) as soLuongThucPham 
      FROM danhmuc
      JOIN khothucpham ON danhmuc.maDanhMuc = khothucpham.maDanhMuc
      ${whereClause.length > 0 ? `WHERE ${whereClause}` : ''}
      GROUP BY danhmuc.maDanhMuc
      ORDER BY danhmuc.tenDanhMuc ASC
      LIMIT ? OFFSET ?
      `, [limit, offset]);

      const [total] = await pool.query(`
      SELECT COUNT(DISTINCT danhmuc.maDanhMuc) as total
      FROM danhmuc
      JOIN khothucpham ON danhmuc.maDanhMuc = khothucpham.maDanhMuc
      ${whereClause.length > 0 ? `WHERE ${whereClause}` : ''}
      `);

      return {
        data: rows,
        total
      };
    } catch (error) {
      console.error(`DAO error: ${error}`);
      throw error;
    }
  };

  public getAllForFilter = async () => {
    try {
      const [rows] = await pool.query(`
      SELECT maDanhMuc, tenDanhMuc 
      FROM danhmuc
      WHERE trangThai = 1
      ORDER BY tenDanhMuc ASC
      `);
      return rows;
    } catch (error) {
      console.error(`DAO error: ${error}`);
    }
  };

  public getAllForSelectBox = async () => {
    try {
      const [rows] = await pool.query(`
      SELECT maDanhMuc, tenDanhMuc 
      FROM danhmuc
      WHERE trangThai = 1
      ORDER BY tenDanhMuc ASC
      `);
      return rows;
    } catch (error) {
      console.error(`DAO error: ${error}`);
    }
  };
}
