import { pool } from "../configs/database.js";

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
}
