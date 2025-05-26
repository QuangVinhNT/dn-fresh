import { RowDataPacket } from "mysql2";
import { ThucPhamYeuThichDAO } from "../daos/thucPhamYeuThichDAO.js";
import { pool } from "../configs/database.js";
import { ThucPhamYeuThich } from "../models/thucPhamYeuThichModel.js";

export class ThucPhamYeuThichService {
  private thucPhamYeuThichDAO: ThucPhamYeuThichDAO;

  constructor () {
    this.thucPhamYeuThichDAO = new ThucPhamYeuThichDAO();
  }

  public getAll = async (page: number, limit: number, userId: string) => {
    try {
      const rows = await this.thucPhamYeuThichDAO.getAll(page, limit, userId);
      const total = rows.total as RowDataPacket[];
      return {
        data: rows.data,
        total: total[0].total
      };
    } catch (error) {
      console.error('Error service:', error);
      throw error;
    }
  };

  public insert = async (thucPhamYeuThich: ThucPhamYeuThich) => {
    const connection = await pool.getConnection();
    try {
      connection.beginTransaction();
      const result = await this.thucPhamYeuThichDAO.insert(thucPhamYeuThich, connection);
      connection.commit();
      return result;
    } catch (error) {
      connection.rollback();
      console.error(`Error service: ${error}`);
      throw error;
    } finally {
      connection.release();
    }
  };

  public delete = async (thucPhamYeuThich: ThucPhamYeuThich) => {
    const connection = await pool.getConnection();
    try {
      connection.beginTransaction();
      const result = await this.thucPhamYeuThichDAO.delete(thucPhamYeuThich, connection);
      connection.commit();
      return result;
    } catch (error) {
      connection.rollback();
      console.error(`Error service: ${error}`);
      throw error;
    } finally {
      connection.release();
    }
  };
}
