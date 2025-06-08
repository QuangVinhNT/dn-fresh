import { PoolConnection } from "mysql2/promise";
import { pool } from "../configs/database.js";
import { PhieuXuat } from "../models/phieuXuatModel.js";

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
      ORDER BY ngayTao DESC
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

  public getById = async (exportReceiptId: string) => {
    try {
      const [rows] = await pool.query(`
        SELECT px.maPhieuXuat, ngayXuatHang, ghiChu, maNhanVien, nv.hoTen as tenNhanVien, px.trangThai, maQuanTriVien, qtv.hoTen as tenQuanTriVien, px.ngayTao, px.ngayCapNhat
        FROM phieuxuat AS px
        LEFT JOIN nguoidung AS nv ON px.maNhanVien = nv.maNguoiDung
        LEFT JOIN nguoidung AS qtv ON px.maQuanTriVien = qtv.maNguoiDung
        WHERE px.maPhieuXuat = ?
        `, [exportReceiptId]);
      return rows;
    } catch (error) {
      console.error(`DAO error: ${error}`);
      throw error;
    }
  };

  public insert = async (exportReceipt: PhieuXuat, connection: PoolConnection) => {
    try {
      const result = await connection.query(`
        INSERT INTO phieuxuat (maPhieuXuat, ngayXuatHang, ghiChu, maNhanVien, trangThai, maQuanTriVien, ngayTao, ngayCapNhat)
        VALUES (?, null, ?, null, 3, ?, NOW(), NOW())
        `, [exportReceipt.getMaPhieuXuat(), exportReceipt.getGhiChu(), exportReceipt.getMaQuanTriVien()]);
      return result;
    } catch (error) {
      console.error(`DAO error: ${error}`);
      throw error;
    }
  };

  public update = async (exportReceipt: PhieuXuat, connection: PoolConnection) => {
    try {
      const result = await connection.query(`
        UPDATE phieuxuat
        SET ngayCapNhat = NOW(), ghiChu = ?, maQuanTriVien = ?
        WHERE maPhieuXuat = ?
        `, [exportReceipt.getGhiChu(), exportReceipt.getMaQuanTriVien(), exportReceipt.getMaPhieuXuat()]);
      return result;
    } catch (error) {
      console.error(`DAO error: ${error}`);
      throw error;
    }
  }

  public softDelete = async (exportReceiptId: string, adminId: string, connection: PoolConnection) => {
    try {
      const result = await connection.query(`
        UPDATE phieuxuat
        SET trangThai = 0, ngayCapNhat = NOW(), maQuantriVien = ?
        WHERE maPhieuXuat = ?
        `, [adminId, exportReceiptId]);
      return result;
    } catch (error) {
      console.error(`DAO error: ${error}`);
      throw error;
    }
  };

  public approveExportReceipt = async (exportReceiptId: string, adminId: string, connection: PoolConnection) => {
    try {
      const result = await connection.query(`
        UPDATE phieuxuat
        SET trangThai = 1, ngayCapNhat = NOW(), maQuanTriVien = ?
        WHERE maPhieuXuat = ?
        `, [adminId, exportReceiptId]);
      return result;
    } catch (error) {
      console.error(`DAO error: ${error}`);
      throw error;
    }
  };
}
