import { pool } from "../configs/database.js";

export class ChiTietPhieuXuatDAO {
  public getAllByExportReceiptId = async (exportReceiptId: string) => {
    try {
      const [rows] = await pool.query(`
        SELECT maLoHang, ct.maThucPham, tenThucPham, soLuong, donViTinh
        FROM chitietphieuxuat AS ct
        JOIN khothucpham AS tp ON ct.maThucPham = tp.maThucPham
        WHERE maPhieuXuat = ?
        `, [exportReceiptId]);
      return rows;
    } catch (error) {
      console.error('DAO error:', error);
      throw error;
    }
  }
}
