import { PoolConnection } from "mysql2/promise";
import { VaiTroNguoiDung } from "../models/vaiTroNguoiDungModel.js";

export class VaiTroNguoiDungDAO {

  public insertUserRole = async (userRole: VaiTroNguoiDung, connection: PoolConnection) => {
    try {
      const [result] = await connection.query(`
        INSERT INTO vaitronguoidung
        VALUE (?, ?)
        `, [userRole.getMaNguoiDung(), userRole.getMaVaiTro()])
      return result;
    } catch (error) {
      console.error('DAO error:', error);
      throw error;
    }
  }
}
