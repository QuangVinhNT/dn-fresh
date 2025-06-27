import { PoolConnection } from "mysql2/promise";
import { pool } from "../configs/database.js";
import { ChiTietDonHang } from "../models/chiTietDonHangModel.js";

export class ChiTietDonHangDAO {
  public getById = async (orderId: string) => {
    try {
      const [rows] = await pool.query(`
        SELECT ctdh.maThucPham, tenThucPham, ctdh.soLuong, donGia, tiLeKhuyenMai, donViTinh, dm.tenDanhMuc, SUM(ctdh.soLuong * donGia - ctdh.soLuong * ROUND((donGia * tiLeKhuyenMai) / 100) * 100) as giaTien
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
  }

  public insert = async (orderDetail: ChiTietDonHang, connection: PoolConnection) => {
    try {
      const [result] = await connection.query(`
        INSERT INTO chitietdonhang (maDonHang, maThucPham, soLuong)
        VALUES (?, ?, ?)
      `, [orderDetail.getMaDonHang(), orderDetail.getMaThucPham(), orderDetail.getSoLuong()]);
      return result;
    } catch (error) {
      console.error('DAO error:', error)
      throw error
    }
  }
}
