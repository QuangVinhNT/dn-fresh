import { PoolConnection } from "mysql2/promise";
import { pool } from "../configs/database.js";
import { AnhThucPham } from "../models/anhThucPhamModel.js";

export class AnhThucPhamDAO {
  public getOneByProductId = async (productId: string) => {
    try {
      const [rows] = await pool.query(`
        SELECT hinhAnh
        FROM anhthucpham
        WHERE maThucPham = ?
        LIMIT 1
      `, [productId]);
      return rows;
    } catch (error) {
      console.error('DAO error:', error);
      throw error;
    }
  };

  public insertProductImage = async (productImage: AnhThucPham, connection: PoolConnection) => {
    try {
      const [result] = await connection.query(`
        INSERT INTO anhthucpham (maAnh, maThucPham, hinhAnh)
        VALUES (?, ?, ?)
      `, [productImage.getMaAnh(), productImage.getMaThucPham(), productImage.getHinhAnh()]);
      return result;
    } catch (error) {
      console.error('DAO error:', error);
      throw error;
    }
  };

  public deleteProductImage = async (productId: string, connection: PoolConnection) => {
    try {
      const [result] = await connection.query(`
        DELETE FROM anhthucpham
        WHERE maThucPham = ?
      `, [productId]);
      return result;
    } catch (error) {
      console.error('DAO error:', error);
      throw error;
    }
  };
}
