import { PoolConnection } from "mysql2/promise";
import { pool } from "../configs/database.js";
import { DonHang } from "../models/donHangModel.js";

export class DonHangDAO {

  public getAll = async (page: number, limit: number, userId: string, orderId: string) => {
    const offset = (page - 1) * limit;
    try {
      const [rows] = await pool.query(`
      SELECT dh.maDonHang, dh.ngayTao, dh.trangThai, phuongThucThanhToan, SUM(ctdh.soLuong * tp.donGia) as tongTien
      FROM donhang AS dh
      LEFT JOIN chitietdonhang AS ctdh ON ctdh.maDonHang = dh.maDonHang
      LEFT JOIN khothucpham AS tp ON ctdh.maThucPham = tp.maThucPham
      WHERE (dh.maKhachHang = ?) ${orderId.length > 0 ? `AND BINARY LOWER(dh.maDonHang) LIKE LOWER('%${orderId}%')` : ''}
      GROUP BY maDonHang
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

  public getOrderDetails = async (orderId: string) => {
    try {
      const [rows] = await pool.query(`
        SELECT ctdh.maThucPham, tenThucPham, ctdh.soLuong, donGia, tiLeKhuyenMai, donViTinh, dm.tenDanhMuc, SUM(ctdh.soLuong * donGia - ctdh.soLuong * donGia * tiLeKhuyenMai) as giaTien
        FROM chitietdonhang AS ctdh
        JOIN khothucpham AS tp ON ctdh.maThucPham = tp.maThucPham
        JOIN danhmuc AS dm ON dm.maDanhMuc = tp.maDanhMuc
        WHERE maDonHang = ?
        GROUP BY ctdh.maThucPham
        ORDER BY tenThucPham ASC
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
      GROUP BY dh.maDonHang
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

  public insertOrder = async (order: DonHang, connection: PoolConnection) => {
    try {
      const [result] = await connection.query(`
        INSERT INTO donhang (maDonHang, maKhachHang, maDiaChi, maNhanVien, maPhieuXuat, trangThai, ngayTao, ngayCapNhat, ghiChu, phuongThucThanhToan)
        VALUES (?, ?, ?, NULL, NULL, 1, NOW(), NOW(), ?, ?)
      `, [order.getMaDonHang(), order.getMaKhachHang(), order.getMaDiaChi(), order.getGhiChu(), order.getPhuongThucThanhToan()]);
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

  public changeStatus = async (orderId: string, staffId: string, status: number, connection: PoolConnection) => {
    try {
      const [result] = await connection.query(`
        UPDATE donhang
        SET trangThai = ?, ngayCapNhat = NOW(), maNhanVien = ${staffId ? 'NULL' : '?'}
        WHERE maDonHang = ?
      `, [status, staffId, orderId]);
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
        SET trangThai = 0, ngayCapNhat = NOW(), maNhanVien = ?, ghiChu = ?
        WHERE maDonHang = ?
      `, [staffId, note, orderId]);
      return result;
    } catch (error) {
      console.error('DAO error:', error);
      throw error;
    }
  };
}
