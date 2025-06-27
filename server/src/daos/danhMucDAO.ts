import { PoolConnection } from "mysql2/promise";
import { pool } from "../configs/database.js";
import { DanhMuc } from "../models/danhMucModel.js";

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
      LEFT JOIN khothucpham ON danhmuc.maDanhMuc = khothucpham.maDanhMuc
      ${whereClause.length > 0 ? `WHERE ${whereClause}` : ''}
      GROUP BY danhmuc.maDanhMuc
      ORDER BY danhmuc.tenDanhMuc ASC
      LIMIT ? OFFSET ?
      `, [limit, offset]);

      const [total] = await pool.query(`
      SELECT COUNT(DISTINCT danhmuc.maDanhMuc) as total
      FROM danhmuc
      LEFT JOIN khothucpham ON danhmuc.maDanhMuc = khothucpham.maDanhMuc
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
      throw error;
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
      throw error;
    }
  };

  public getById = async (categoryId: string) => {
    try {
      const [rows] = await pool.query(`
        SELECT *
        FROM danhmuc
        WHERE maDanhMuc = ?
        `, [categoryId]);
      return rows;
    } catch (error) {
      console.error(`DAO error: ${error}`);
      throw error;
    }
  };

  public insertCategory = async (category: DanhMuc, connection: PoolConnection) => {
    try {
      const [result] = await connection.query(`
        INSERT INTO danhmuc(maDanhMuc, tenDanhMuc, moTa, trangThai, ngayTao, ngayCapNhat)
        VALUES (?, ?, ?, ?, NOW(), NOW())
        `, [category.getMaDanhMuc(), category.getTenDanhMuc(), category.getMoTa(), category.getTrangThai()]);
      return result;
    } catch (error) {
      console.error(`DAO error: ${error}`);
      throw error;
    }
  };

  public updateCategory = async (category: DanhMuc, connection: PoolConnection) => {
    try {
      const [result] = await connection.query(`
        UPDATE danhmuc
        SET tenDanhMuc = ?, moTa = ?, trangThai = ?, ngayCapNhat = NOW()
        WHERE maDanhMuc = ?
        `, [category.getTenDanhMuc(), category.getMoTa(), category.getTrangThai(), category.getMaDanhMuc()]);
      return result;
    } catch (error) {
      console.error(`DAO error: ${error}`);
      throw error;
    }
  };

  public deleteCategory = async (categoryId: string, connection: PoolConnection) => {
    try {
      const [result] = await connection.query(`
        DELETE FROM danhmuc
        WHERE maDanhMuc = ?
        `, [categoryId]);
      return result;
    } catch (error) {
      console.error(`DAO error: ${error}`);
      throw error;
    }
  };

  public getAllByProviderId = async (providerId: string) => {
    try {
      const [rows] = await pool.query(`
        SELECT DISTINCT(tenDanhMuc)
        FROM danhmuc AS dm
        JOIN khothucpham AS tp ON tp.maDanhMuc = dm.maDanhMuc
        JOIN chitietthucphamnhap AS cttp ON cttp.maThucPham = tp.maThucPham
        JOIN phieunhap AS pn ON pn.maPhieuNhap = cttp.maPhieuNhap
        WHERE pn.maNhaCungCap = ?;
        `, [providerId]);
      return rows;
    } catch (error) {
      console.error(`DAO error: ${error}`);
      throw error;
    }
  };
}
