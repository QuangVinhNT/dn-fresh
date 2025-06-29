import { PoolConnection } from "mysql2/promise";
import { pool } from "../configs/database.js";
import { KhoThucPham } from "../models/khoThucPhamModel.js";

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
      SELECT p.maThucPham, tenThucPham, COALESCE(JSON_ARRAYAGG(pi.hinhAnh), JSON_ARRAY()) as hinhAnh, donGia, tiLeKhuyenMai, p.trangThai, donViTinh
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
      SELECT COUNT(DISTINCT maThucPham) as total
      FROM khothucpham
      ${categoryId.length > 0 ? `WHERE maDanhMuc = '${categoryId}'` : ''}
      `);
      return {
        data: rows,
        total,
      };
    } catch (error) {
      console.error('DAO error:', error);
      throw error;
    }
  };

  public getById = async (productId: string) => {
    try {
      const [rows] = await pool.query(`
      SELECT p.maThucPham, tenThucPham, donGia, soLuongTonKho, donViTinh, p.moTa, COALESCE(JSON_ARRAYAGG(pi.hinhAnh), JSON_ARRAY()) as hinhAnh, p.trangThai, p.tiLeKhuyenMai, soLuongChoXuat
      FROM khothucpham as p
      LEFT JOIN anhthucpham as pi on pi.maThucPham = p.maThucPham
      WHERE p.maThucPham = ?
      GROUP BY maThucPham
      `, [productId]);
      return rows;
    } catch (error) {
      console.error('DAO error:', error);
      throw error;
    }
  };

  public getAllDiscount = async () => {
    try {
      const [rows] = await pool.query(`
      SELECT p.maThucPham, tenThucPham, COALESCE(JSON_ARRAYAGG(pi.hinhAnh), JSON_ARRAY()) as hinhAnh, donGia, tiLeKhuyenMai, p.trangThai, donViTinh
      FROM khothucpham as p
      LEFT JOIN anhthucpham as pi on pi.maThucPham = p.maThucPham
      WHERE tiLeKhuyenMai > 0
      GROUP BY p.maThucPham
      ORDER BY tiLeKhuyenMai DESC
      LIMIT 5
      `);
      return rows;
    } catch (error) {
      console.error('DAO error:', error);
      throw error;
    }
  };

  public getAllForAdmin = async (page: number, limit: number, productName: string, status: string, category: string) => {
    const offset = (page - 1) * limit;
    const whereClause = [
      productName.length > 0 ? `BINARY LOWER(tenThucPham) LIKE LOWER('%${productName}%')` : '',
      status.length > 0 ? `p.trangThai IN (${status})` : '',
      category.length > 0 ? `p.maDanhMuc IN (${category})` : ''
    ].filter(item => item.length > 0).join(' AND ');

    try {
      const [rows] = await pool.query(`
      SELECT p.maThucPham, tenThucPham, tenDanhMuc, soLuongTonKho, donViTinh, p.ngayTao, COALESCE(JSON_ARRAYAGG(pi.hinhAnh), JSON_ARRAY()) as hinhAnh, p.trangThai 
      FROM khothucpham as p
      INNER JOIN danhmuc as c on p.maDanhMuc = c.maDanhMuc
      LEFT JOIN anhthucpham as pi on pi.maThucPham = p.maThucPham
      ${whereClause.length > 0 ? `WHERE ${whereClause}` : ''}
      GROUP BY p.maThucPham
      ORDER BY p.tenThucPham
      LIMIT ? 
      OFFSET ?
    `, [limit, offset]);

      const [total] = await pool.query(`
      SELECT COUNT(DISTINCT p.maThucPham) as total
      FROM khothucpham as p
      INNER JOIN danhmuc as c on p.maDanhMuc = c.maDanhMuc
      ${whereClause.length > 0 ? `WHERE ${whereClause}` : ''}
      `);

      return {
        data: rows,
        total,
      };
    } catch (error) {
      console.error('DAO error:', error);
      throw error;
    }
  };

  public getByIdForAdmin = async (productId: string) => {
    try {
      const [rows] = await pool.query(`
      SELECT p.maThucPham, tenThucPham, donGia, soLuongTonKho, donViTinh, tenDanhMuc, p.ngayTao, p.ngayCapNhat, p.moTa, COALESCE(JSON_ARRAYAGG(pi.hinhAnh), JSON_ARRAY()) as hinhAnh, p.maDanhMuc, p.trangThai, p.tiLeKhuyenMai
      FROM khothucpham as p
      INNER JOIN danhmuc as c on p.maDanhMuc = c.maDanhMuc
      LEFT JOIN anhthucpham as pi on pi.maThucPham = p.maThucPham
      WHERE p.maThucPham = ?
      `, [productId]);
      return rows;
    } catch (error) {
      console.error('DAO error:', error);
      throw error;
    }
  };

  public insertProduct = async (product: KhoThucPham, connection: PoolConnection) => {
    try {
      const [result] = await connection.query(`
        INSERT INTO khothucpham (maThucPham, tenThucPham, donGia, moTa, trangThai, maDanhMuc, tiLeKhuyenMai, ngayTao, ngayCapNhat, soLuongTonKho, donViTinh, soLuongChoXuat)
        VALUES (?, ?, ?, ?, 2, ?, 0, NOW(), NOW(), 0, ?, 0)
      `, [product.getMaThucPham(), product.getTenThucPham(), product.getDonGia(), product.getMoTa(), product.getMaDanhMuc(), product.getDonViTinh()]);
      return result;
    } catch (error) {
      console.error('DAO error:', error);
      throw error;
    }
  };

  public updateProduct = async (product: KhoThucPham, connection: PoolConnection) => {
    try {
      const [result] = await connection.query(`
        UPDATE khothucpham
        SET tenThucPham = ?, donGia = ?, moTa = ?, maDanhMuc = ?, donViTinh = ?, trangThai = ?, tiLeKhuyenMai = ?, ngayCapNhat = NOW()
        WHERE maThucPham = ?
      `, [product.getTenThucPham(), product.getDonGia(), product.getMoTa(), product.getMaDanhMuc(), product.getDonViTinh(), product.getTrangThai(), product.getTiLeKhuyenMai(), product.getMaThucPham()]);
      return result;
    } catch (error) {
      console.error('DAO error:', error);
      throw error;
    }
  };

  public deleteProduct = async (productId: string, connection: PoolConnection) => {
    try {
      const [result] = await connection.query(`
        DELETE FROM khothucpham
        WHERE maThucPham = ?
      `, [productId]);
      return result;
    } catch (error) {
      console.error('DAO error:', error);
      throw error;
    }
  };
}
