import { PoolConnection } from "mysql2/promise";
import { pool } from "../configs/database.js";
import { GioHang } from "../models/gioHangModel.js";

export class GioHangDAO {
  public getAll = async (userId: string) => {
    try {
      const [rows] = await pool.query(`
      SELECT gh.maThucPham, p.tenThucPham, p.donGia, p.tiLeKhuyenMai, p.trangThai, gh.soLuong, p.donViTinh
      FROM giohang as gh
      LEFT JOIN khothucpham as p ON p.maThucPham = gh.maThucPham
      WHERE gh.maNguoiDung = ?
      ORDER BY gh.ngayTao DESC
    `, [userId]);

      return rows;
    } catch (error) {
      console.error('DAO error:', error);
      throw error;
    }
  };

  public insert = async (gioHang: GioHang, connection: PoolConnection) => {
    try {
      const [result] = await connection.query(`
        INSERT INTO giohang (maThucPham, maNguoiDung, soLuong, ngayTao)
        VALUE (?, ?, ?, NOW())
        `, [gioHang.getMaThucPham(), gioHang.getMaNguoiDung(), gioHang.getSoLuong()]);
      return result;
    } catch (error) {
      console.error('DAO error:', error);
      throw error;
    }
  };

  public update = async (gioHang: GioHang, connection: PoolConnection) => {
    try {
      const [result] = await connection.query(`
        UPDATE giohang
        SET soLuong = ?
        WHERE (maNguoiDung = ?) AND (maThucPham = ?)
        `, [gioHang.getSoLuong(), gioHang.getMaNguoiDung(), gioHang.getMaThucPham()]);
      return result;
    } catch (error) {
      console.error('DAO error:', error);
      throw error;
    }
  };

  public delete = async (gioHang: GioHang, connection: PoolConnection) => {
    try {
      const [result] = await connection.query(`
        DELETE FROM giohang
        WHERE (maNguoiDung = ?) ${gioHang.getMaThucPham().length > 0 ? `AND (maThucPham = '${gioHang.getMaThucPham()}')` : ''}
        `, [gioHang.getMaNguoiDung()]);
      return result;
    } catch (error) {
      console.error('DAO error:', error);
      throw error;
    }
  };
}
