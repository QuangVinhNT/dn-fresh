import { pool } from "../configs/database.js";

export class DiaChiDAO {
  public getById = async (addressId: string) => {
    try {
      const [rows] = await pool.query(`
        SELECT CONCAT(
          dc.chiTietDiaChi, ', ',
          px.tenPhuongXa, ', ',
          tp.tenTinhThanhPho
        ) AS diaChi
        FROM DIACHI dc
        JOIN PHUONGXA px ON dc.maPhuongXa = px.maPhuongXa
        JOIN TINHTHANHPHO tp ON px.maTinhThanhPho = tp.maTinhThanhPho
        WHERE dc.maDiaChi = ?;
        `, [addressId]);
      return rows;
    } catch (error) {
      console.error('DAO error:', error);
      throw error;
    }
  };
}
