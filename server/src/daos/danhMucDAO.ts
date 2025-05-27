import { pool } from "../configs/database.js";

export class DanhMucDAO {
  
  public getAllForFilter = async () => {
    try {
      const [rows] = await pool.query(`
      SELECT maDanhMuc, tenDanhMuc 
      FROM danhmuc
      WHERE trangThai = 1
      `);
      return rows;
    } catch (error) {
      console.error(`DAO error: ${error}`);
    }
  };
}
