import { pool } from "../configs/database.js";

/**
 * COALESCE: Trả về giá trị không phải NULL đầu tiên trong danh sách các tham số được cung cấp.
 * JSON_ARRAYAGG: Gộp các giá trị (hoặc đối tượng JSON) thành một mảng JSON.
 * JSON_OBJECT: Tạo một đối tượng JSON từ các cặp key-value.
 * JSON_ARRAY: Tạo một mảng JSON chứa các giá trị được chỉ định (không truyền tham số --> mảng rỗng).
 */

export class KhoThucPhamDAO {

  public getAll = async (page: number, limit: number, categoryId: string, orderBy: { columnName: string, direction: string; }, productName: string) => {
    const offset = (page - 1) * limit;
    try {
      const [rows] = await pool.query(`
      SELECT p.maThucPham, tenThucPham, COALESCE(JSON_ARRAYAGG(pi.hinhAnh), JSON_ARRAY()) as hinhAnh, donGia, tiLeKhuyenMai, p.trangThai
      FROM khothucpham as p
      LEFT JOIN anhthucpham as pi on pi.maThucPham = p.maThucPham
      ${categoryId.length > 0 ? `WHERE maDanhMuc = '${categoryId}'` : ''}
      ${productName.length > 0 ? `WHERE BINARY LOWER(tenThucPham) LIKE LOWER('%${productName}%')` : ''}
      GROUP BY p.maThucPham
      ${orderBy.columnName.length > 0 ? `ORDER BY ${orderBy.columnName} ${orderBy.direction}` : ''}
      LIMIT ? 
      OFFSET ?
    `, [limit, offset]);

      const [total] = await pool.query(`
      SELECT COUNT(maThucPham) as total
      FROM khothucpham
      ${categoryId.length > 0 ? `WHERE maDanhMuc = '${categoryId}'` : ''}
      `);
      return {
        data: rows,
        total,
      };
    } catch (error) {
      console.error('Model error:', error);
      throw error;
    }
  };

  public getById = async (productId: string) => {
    try {
      const [rows] = await pool.query(`
      SELECT p.maThucPham, tenThucPham, donGia, soLuongTonKho, donViTinh, p.moTa, COALESCE(JSON_ARRAYAGG(pi.hinhAnh), JSON_ARRAY()) as hinhAnh, p.trangThai, p.tiLeKhuyenMai
      FROM khothucpham as p
      LEFT JOIN anhthucpham as pi on pi.maThucPham = p.maThucPham
      WHERE p.maThucPham = ?
      GROUP BY maThucPham
      `, [productId]);
      return rows;
    } catch (error) {
      console.error('Model error:', error);
      throw error;
    }
  };

  public getAllDiscount = async () => {
    try {
      const [rows] = await pool.query(`
      SELECT p.maThucPham, tenThucPham, COALESCE(JSON_ARRAYAGG(pi.hinhAnh), JSON_ARRAY()) as hinhAnh, donGia, tiLeKhuyenMai, p.trangThai
      FROM khothucpham as p
      LEFT JOIN anhthucpham as pi on pi.maThucPham = p.maThucPham
      WHERE tiLeKhuyenMai > 0
      GROUP BY p.maThucPham
      ORDER BY tiLeKhuyenMai DESC
      LIMIT 5
      `);
      return rows;
    } catch (error) {
      console.error('Model error:', error);
      throw error;
    }
  };
}
