import { PoolConnection } from "mysql2/promise";
import { pool } from "../configs/database.js";
import { ChiTietPhieuXuat } from "../models/chiTietPhieuXuatModel.js";

export class ChiTietPhieuXuatDAO {
  public getAllByExportReceiptId = async (exportReceiptId: string) => {
    try {
      const [rows] = await pool.query(`
        SELECT maLoHang, ct.maThucPham, tenThucPham, soLuong, donViTinh
        FROM chitietphieuxuat AS ct
        JOIN khothucpham AS tp ON ct.maThucPham = tp.maThucPham
        WHERE maPhieuXuat = ?
        ORDER BY ct.maThucPham
        `, [exportReceiptId]);
      return rows;
    } catch (error) {
      console.error('DAO error:', error);
      throw error;
    }
  };

  public insert = async (exportReceiptDetail: ChiTietPhieuXuat, connection: PoolConnection) => {
    try {
      const result = await connection.query(`
        INSERT INTO chitietphieuxuat(maLoHang, maThucPham, maPhieuXuat, soLuong)
        VALUES (?, ?, ?, ?)
        `, [exportReceiptDetail.getMaLoHang(), exportReceiptDetail.getMaThucPham(), exportReceiptDetail.getMaPhieuXuat(), exportReceiptDetail.getSoLuong()]);
      return result;
    } catch (error) {
      console.error('DAO error:', error);
      throw error;
    }
  };

  public update = async (exportReceiptDetail: ChiTietPhieuXuat, connection: PoolConnection) => {
    try {
      const result = await connection.query(`
        UPDATE chitietphieuxuat
        SET soLuong = ?
        WHERE maLoHang = ? AND maThucPham = ? AND maPhieuXuat = ?
        `, [exportReceiptDetail.getSoLuong(), exportReceiptDetail.getMaLoHang(), exportReceiptDetail.getMaThucPham(), exportReceiptDetail.getMaPhieuXuat()]);
      return result;
    } catch (error) {
      console.error('DAO error:', error);
      throw error;
    }
  };

  public delete = async (exportReceiptId: string, connection: PoolConnection) => {
    try {
      const result = await connection.query(`
        DELETE FROM chitietphieuxuat
        WHERE maPhieuXuat = ?
        `, [exportReceiptId]);
      return result;
    } catch (error) {
      console.error('DAO error:', error);
      throw error;
    }
  };
}
