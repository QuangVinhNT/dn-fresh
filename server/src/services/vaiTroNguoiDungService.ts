import { PoolConnection, RowDataPacket } from "mysql2/promise";
import { pool } from "../configs/database.js";
import { VaiTroNguoiDungDAO } from "../daos/vaiTroNguoiDungDAO.js";
import { VaiTroNguoiDung } from "../models/vaiTroNguoiDungModel.js";

export class VaiTroNguoiDungService {
  private vaiTroNguoiDungDAO: VaiTroNguoiDungDAO;

  constructor () {
    this.vaiTroNguoiDungDAO = new VaiTroNguoiDungDAO();
  }

  public insertUserRole = async (userRole: VaiTroNguoiDung, connection: PoolConnection) => {
    try {
      const result = await this.vaiTroNguoiDungDAO.insertUserRole(userRole, connection);
      return result;
    } catch (error) {
      console.error('Error service:', error);
      throw error;
    }
  };

  public getAllRoleByUserId = async (userId: string) => {
    try {
      const rows = await this.vaiTroNguoiDungDAO.getAllRoleByUserId(userId) as RowDataPacket[];
      return rows.map(row => row.maVaiTro + '');
    } catch (error) {
      console.error('Error service:', error);
      throw error;
    }
  };

  public deleteAllStaffRole = async (userId: string) => {
    const connection = await pool.getConnection();
    try {
      connection.beginTransaction();
      const result = await this.vaiTroNguoiDungDAO.deleteAllStaffRole(userId, connection);
      connection.commit();
      return result;
    } catch (error) {
      connection.rollback();
      console.error('Error service:', error);
      throw error;
    } finally {
      connection.release();
    }
  };

  public updateRole = async (userRole: VaiTroNguoiDung) => {
    const connection = await pool.getConnection();
    try {
      connection.beginTransaction();
      const result = await this.vaiTroNguoiDungDAO.updateRole(userRole, connection);
      connection.commit();
      return result;
    } catch (error) {
      connection.rollback();
      console.error('Error service:', error);
      throw error;
    } finally {
      connection.release();
    }
  }
}
