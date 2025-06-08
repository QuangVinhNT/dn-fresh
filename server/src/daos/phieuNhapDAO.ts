import { PoolConnection } from "mysql2/promise";
import { pool } from "../configs/database.js";
import { PhieuNhap } from "../models/phieuNhapModel.js";

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
      ORDER BY phieunhap.ngayTao DESC
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

  public getById = async (importReceiptId: string) => {
    try {
      const [rows] = await pool.query(`
        SELECT pn.maPhieuNhap, ngayNhapHang, ghiChu, maNhanVien, nv.hoTen as tenNhanVien, pn.trangThai, maQuanTriVien, qtv.hoTen as tenQuanTriVien, pn.ngayTao, pn.ngayCapNhat, pn.maNhaCungCap, ncc.tenNhaCungCap
        FROM phieunhap AS pn
        LEFT JOIN nguoidung AS nv ON pn.maNhanVien = nv.maNguoiDung
        LEFT JOIN nguoidung AS qtv ON pn.maQuanTriVien = qtv.maNguoiDung
        JOIN nhacungcap AS ncc ON pn.maNhaCungCap = ncc.maNhaCungCap
        WHERE pn.maPhieuNhap = ?
        `, [importReceiptId]);
      return rows;
    } catch (error) {
      console.error(`DAO error: ${error}`);
      throw error;
    }
  };

  public insert = async (importReceipt: PhieuNhap, connection: PoolConnection) => {
    try {
      const result = await connection.query(`
        INSERT INTO phieunhap (maPhieuNhap, ngayNhapHang, ghiChu, maNhanVien, trangThai, maQuanTriVien, ngayTao, ngayCapNhat, maNhaCungCap)
        VALUES (?, null, ?, null, 3, ?, NOW(), NOW(), ?)
        `, [importReceipt.getMaPhieuNhap(), importReceipt.getGhiChu(), importReceipt.getMaQuanTriVien(), importReceipt.getMaNhaCungCap()]);
      return result;
    } catch (error) {
      console.error(`DAO error: ${error}`);
      throw error;
    }
  };

  public softDelete = async (importReceiptId: string, adminId: string, connection: PoolConnection) => {
    try {
      const result = await connection.query(`
        UPDATE phieunhap
        SET trangThai = 0, ngayCapNhat = NOW(), maQuantriVien = ?
        WHERE maPhieuNhap = ?
        `, [adminId, importReceiptId]);
      return result;
    } catch (error) {
      console.error(`DAO error: ${error}`);
      throw error;
    }
  };

  public update = async (importReceipt: PhieuNhap, connection: PoolConnection) => {
    try {
      const result = await connection.query(`
        UPDATE phieunhap
        SET ngayCapNhat = NOW(), ghiChu = ?, maNhaCungCap = ?, maQuanTriVien = ?
        WHERE maPhieuNhap = ?
        `, [importReceipt.getGhiChu(), importReceipt.getMaNhaCungCap(), importReceipt.getMaQuanTriVien(), importReceipt.getMaPhieuNhap()]);
      return result;
    } catch (error) {
      console.error(`DAO error: ${error}`);
      throw error;
    }
  };

  public approveImportReceipt = async (importReceiptId: string, adminId: string, connection: PoolConnection) => {
    try {
      const result = await connection.query(`
        UPDATE phieunhap
        SET trangThai = 1, ngayCapNhat = NOW(), maQuanTriVien = ?
        WHERE maPhieuNhap = ?
        `, [adminId, importReceiptId]);
      return result;
    } catch (error) {
      console.error(`DAO error: ${error}`);
      throw error;
    }
  };
}
