import { PoolConnection } from "mysql2/promise";
import { VaiTroNguoiDung } from "../models/vaiTroNguoiDungModel.js";
import { pool } from "../configs/database.js";

export class VaiTroNguoiDungDAO {

  public insertUserRole = async (userRole: VaiTroNguoiDung, connection: PoolConnection) => {
    try {
      const [result] = await connection.query(`
        INSERT INTO vaitronguoidung
        VALUE (?, ?)
        `, [userRole.getMaNguoiDung(), userRole.getMaVaiTro()]);
      return result;
    } catch (error) {
      console.error('DAO error:', error);
      throw error;
    }
  };

  public getAllRoleByUserId = async (userId: string) => {
    try {
      const [rows] = await pool.query(`
        SELECT maVaiTro
        FROM vaitronguoidung
        WHERE maNguoiDung = ?
        `, [userId]);
      return rows;
    } catch (error) {
      console.error('DAO error:', error);
      throw error;
    }
  };

  public deleteAllStaffRole = async (userId: string, connection: PoolConnection) => {
    try {
      const [result] = await connection.query(`
        DELETE FROM vaitronguoidung
        WHERE maNguoiDung = ? AND maVaiTro IN ('VT001', 'VT002', 'VT003')
        `, [userId]);
      return result;
    } catch (error) {
      console.error('DAO error:', error);
      throw error;
    }
  };

  public updateRole = async (userRole: VaiTroNguoiDung, connection: PoolConnection) => {
    try {
      const [result] = await connection.query(`
        UPDATE vaitronguoidung
        SET maVaiTro = ?
        WHERE maNguoiDung = ? AND maVaiTro IN ('VT001', 'VT002', 'VT003')
        `, [userRole.getMaVaiTro(), userRole.getMaNguoiDung()]);
      return result;
    } catch (error) {
      console.error('DAO error:', error);
      throw error;
    }
  };
}
