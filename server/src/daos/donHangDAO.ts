import { PoolConnection } from "mysql2/promise";
import { pool } from "../configs/database.js";
import { DonHang } from "../models/donHangModel.js";

export class DonHangDAO {

  public getAll = async (page: number, limit: number, userId: string, orderId: string) => {
    const offset = (page - 1) * limit;
    try {
      const [rows] = await pool.query(`
      SELECT dh.maDonHang, dh.ngayTao, dh.trangThai, phuongThucThanhToan, giaTriDonHang as tongTien
      FROM donhang AS dh
      WHERE (dh.maKhachHang = ?) ${orderId.length > 0 ? `AND BINARY LOWER(dh.maDonHang) LIKE LOWER('%${orderId}%')` : ''}
      ORDER BY dh.ngayTao DESC
      LIMIT ? 
      OFFSET ?
    `, [userId, limit, offset]);

      const [total] = await pool.query(`
      SELECT COUNT(maDonHang) as total
      FROM donhang AS dh
      WHERE (dh.maKhachHang = ?) ${orderId.length > 0 ? `AND BINARY LOWER(dh.maDonHang) LIKE LOWER('%${orderId}%')` : ''}
      `, [userId]);
      return {
        data: rows,
        total,
      };
    } catch (error) {
      console.error('DAO error:', error);
      throw error;
    }
  };

  public getById = async (orderId: string) => {
    try {
      const [rows] = await pool.query(`
        SELECT dh.maDonHang, kh.hoTen, dh.maDiaChi, dh.ngayTao, dh.ngayCapNhat, dh.trangThai, dh.phuongThucThanhToan, dh.ghiChu
        FROM donhang AS dh
        JOIN nguoidung AS kh ON kh.maNguoiDung = dh.maKhachHang
        JOIN chitietdonhang AS ctdh ON ctdh.maDonHang = dh.maDonHang
        WHERE dh.maDonHang = ?
        GROUP BY dh.maDonHang;
        `, [orderId]);
      return rows;
    } catch (error) {
      console.error('DAO error:', error);
      throw error;
    }
  };

  public getAllForAdmin = async (page: number, limit: number, orderId: string, status: string) => {
    const offset = (page - 1) * limit;
    const whereClause = [
      orderId.length > 0 ? `BINARY LOWER(dh.maDonHang) LIKE LOWER('%${orderId}%')` : '',
      status.length > 0 ? `dh.trangThai IN (${status})` : ''
    ].filter(item => item.length > 0).join(' AND ');

    try {
      const [rows] = await pool.query(`
      SELECT maDonHang, dh.ngayTao, kh.hoTen as nguoiNhan, dh.trangThai, maPhieuXuat, nv.hoTen as tenNhanVien
      FROM donhang as dh
      LEFT JOIN nguoidung as kh ON kh.maNguoiDung = dh.maKhachHang
      LEFT JOIN nguoidung as nv ON nv.maNguoiDung = dh.maNhanVien
      ${whereClause.length > 0 ? `WHERE ${whereClause}` : ''}
      LIMIT ? 
      OFFSET ?
    `, [limit, offset]);

      const [total] = await pool.query(`
      SELECT COUNT(DISTINCT maDonHang) as total
      FROM donhang AS dh
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

  public getAllForDeliveryStaff = async (page: number, limit: number, orderId: string, status: string, communeId: string) => {
    const offset = (page - 1) * limit;
    const whereClause = [
      orderId.length > 0 ? `BINARY LOWER(dh.maDonHang) LIKE LOWER('%${orderId}%')` : '',
      status.length > 0 ? `dh.trangThai IN (${status})` : ''
    ].filter(item => item.length > 0).join(' AND ');

    try {
      const [rows] = await pool.query(`
      SELECT maDonHang, dh.ngayTao, kh.hoTen as nguoiNhan, dh.trangThai, maPhieuXuat
      FROM donhang AS dh
      LEFT JOIN nguoidung AS kh ON kh.maNguoiDung = dh.maKhachHang
      LEFT JOIN nguoidung AS nv ON nv.maNguoiDung = dh.maNhanVien
      LEFT JOIN diachi AS dcdh ON dcdh.maDiaChi = dh.maDiaChi
      WHERE dcdh.maPhuongXa = ?
      ${whereClause.length > 0 ? `AND ${whereClause}` : ''}
      LIMIT ? 
      OFFSET ?
    `, [communeId, limit, offset]);

      const [total] = await pool.query(`
      SELECT COUNT(DISTINCT maDonHang) as total
      FROM donhang AS dh
      LEFT JOIN nguoidung AS nv ON nv.maNguoiDung = dh.maNhanVien
      LEFT JOIN diachi AS dcdh ON dcdh.maDiaChi = dh.maDiaChi
      WHERE dcdh.maPhuongXa = ?
      ${whereClause.length > 0 ? `AND ${whereClause}` : ''}
      `, [communeId]);

      return {
        data: rows,
        total,
      };
    } catch (error) {
      console.error('DAO error:', error);
      throw error;
    }
  };

  public getOrderIdsForInventoryStaff = async () => {
    try {
      const [rows] = await pool.query(`
        SELECT maDonHang
        FROM donhang
        WHERE trangThai = 1
        `);
      return rows;
    } catch (error) {
      console.error('DAO error:', error);
      throw error;
    }
  };

  public insertOrder = async (order: DonHang, connection: PoolConnection) => {
    try {
      const [result] = await connection.query(`
        INSERT INTO donhang (maDonHang, maKhachHang, maDiaChi, maNhanVien, maPhieuXuat, trangThai, ngayTao, ngayCapNhat, ghiChu, phuongThucThanhToan, giaTriDonHang)
        VALUES (?, ?, ?, NULL, NULL, 1, NOW(), NOW(), ?, ?, ?)
      `, [order.getMaDonHang(), order.getMaKhachHang(), order.getMaDiaChi(), order.getGhiChu(), order.getPhuongThucThanhToan(), order.getGiaTriDonHang()]);
      return result;
    } catch (error) {
      console.error('DAO error:', error);
      throw error;
    }
  };

  public getByIdForAdmin = async (orderId: string) => {
    try {
      const [rows] = await pool.query(`
        SELECT *
        FROM donhang
        WHERE maDonHang = ?
        `, [orderId]);
      return rows;
    } catch (error) {
      console.error('DAO error:', error);
      throw error;
    }
  };

  public changeStatus = async (orderId: string, staffId: string, status: number, connection: PoolConnection, exportReceiptId?: string) => {
    try {
      const [result] = await connection.query(`
        UPDATE donhang
        SET trangThai = ?,${exportReceiptId && exportReceiptId.length > 0 ? (` maPhieuXuat = '${exportReceiptId}',`) : ''}${staffId.length > 0 ? (` maNhanVien = '${staffId}',`) : ''} ngayCapNhat = NOW()
        WHERE maDonHang = ?
      `, [status, orderId]);
      return result;
    } catch (error) {
      console.error('DAO error:', error);
      throw error;
    }
  };

  public cancelOrder = async (orderId: string, staffId: string, note: string, connection: PoolConnection) => {
    try {
      const [result] = await connection.query(`
        UPDATE donhang
        SET trangThai = 0, ngayCapNhat = NOW(),${staffId.length > 0 ? (` maNhanVien = '${staffId}',`) : ''} ghiChu = ?
        WHERE maDonHang = ?
      `, [note, orderId]);
      return result;
    } catch (error) {
      console.error('DAO error:', error);
      throw error;
    }
  };

  public unpackOrdersByExportReceipt = async (exportReceiptId: string, connection: PoolConnection) => {
    try {
      const [result] = await connection.query(`
        UPDATE donhang
        SET maPhieuXuat = NULL, trangThai = 1
        WHERE maPhieuXuat = ?
        `, [exportReceiptId]);
    } catch (error) {
      console.error('DAO error:', error);
      throw error;
    }
  };
}
