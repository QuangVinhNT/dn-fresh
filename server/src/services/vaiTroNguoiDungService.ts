import { pool } from "../configs/database.js";
import { VaiTroNguoiDungDAO } from "../daos/vaiTroNguoiDungDAO.js";
import { VaiTroNguoiDung } from "../models/vaiTroNguoiDungModel.js";

export class VaiTroNguoiDungService {
  private vaiTroNguoiDungDAO: VaiTroNguoiDungDAO;

  constructor () {
    this.vaiTroNguoiDungDAO = new VaiTroNguoiDungDAO();
  }

  public insertUserRole = async (userRole: VaiTroNguoiDung) => {
    const connection = await pool.getConnection();
    try {
      connection.beginTransaction();
      const result = await this.vaiTroNguoiDungDAO.insertUserRole(userRole, connection);
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
}
