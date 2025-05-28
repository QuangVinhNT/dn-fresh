import { pool } from "../configs/database.js";

export class NguoiDungDAO {

  public getAllCustomer = async (page: number, limit: number, customerId: string, status: string) => {
    const offset = (page - 1) * limit;
    try {
      const [rows] = await pool.query(`
        SELECT nguoidung.maNguoiDung, hoTen, ngaySinh, gioiTinh, email, trangThai, ngayTao
        FROM nguoidung
        JOIN vaitronguoidung ON nguoidung.maNguoiDung = vaitronguoidung.maNguoiDung
        WHERE maVaiTro = 'VT004' 
        ${customerId.length > 0 ? `AND BINARY LOWER(nguoidung.maNguoiDung) LIKE LOWER('%${customerId}%')` : ''}
        ${status.length > 0 ? `AND trangThai IN (${status})` : ''}
        ORDER BY hoTen ASC
        LIMIT ? OFFSET ?
      `, [limit, offset]);

      const [total] = await pool.query(`
        SELECT COUNT(nguoidung.maNguoiDung) as total
        FROM nguoidung
        JOIN vaitronguoidung ON nguoidung.maNguoiDung = vaitronguoidung.maNguoiDung
        WHERE maVaiTro = 'VT004' ${customerId.length > 0 ? `AND BINARY LOWER(nguoidung.maNguoiDung) LIKE LOWER('%${customerId}%')` : ''}
      `);

      return {
        data: rows,
        total,
      };
    } catch (error) {
      console.error('DAO error:', error);
      throw error;
    }
  }

  public getAllStaff = async (page: number, limit: number, staffId: string, status: string, roleId: string) => {
    const offset = (page - 1) * limit;
    const whereClause = [
      staffId.length > 0 ? `BINARY LOWER(nguoidung.maNguoiDung) LIKE LOWER('%${staffId}%')` : '',
      status.length > 0 ? `trangThai IN (${status})` : ''
    ].filter(item => item.length > 0).join(' AND ');
    try {
      const [rows] = await pool.query(`
        SELECT nguoidung.maNguoiDung, hoTen, ngaySinh, gioiTinh, trangThai, maVaiTro, ngayTao
        FROM nguoidung
        INNER JOIN vaitronguoidung ON nguoidung.maNguoiDung = vaitronguoidung.maNguoiDung
        WHERE maVaiTro IN (${roleId.length > 0 ? roleId : "'VT001', 'VT002', 'VT003'"})
        ${whereClause.length > 0 ? `AND ${whereClause}` : ''}
        LIMIT ? OFFSET ?
      `, [limit, offset]);

      const [total] = await pool.query(`
        SELECT COUNT(nguoidung.maNguoiDung) as total
        FROM nguoidung
        JOIN vaitronguoidung ON nguoidung.maNguoiDung = vaitronguoidung.maNguoiDung
        WHERE maVaiTro IN (${roleId.length > 0 ? roleId : "'VT001', 'VT002', 'VT003'"})
        ${whereClause.length > 0 ? `AND ${whereClause}` : ''}
      `);

      return {
        data: rows,
        total,
      };
    } catch (error) {
      console.error('DAO error:', error);
      throw error;
    }
  }
}
