import { RowDataPacket } from "mysql2";
import { pool } from "../configs/database.js";
import { ChiTietPhieuXuatDAO } from "../daos/chiTietPhieuXuatDAO.js";
import { ChiTietPhieuXuat } from "../models/chiTietPhieuXuatModel.js";

export class ChiTietPhieuXuatService {
  private chiTietPhieuXuatDAO: ChiTietPhieuXuatDAO;

  constructor () {
    this.chiTietPhieuXuatDAO = new ChiTietPhieuXuatDAO();
  }

  public getAllByExportReceiptId = async (exportReceiptId: string) => {
    try {
      const rows = await this.chiTietPhieuXuatDAO.getAllByExportReceiptId(exportReceiptId) as RowDataPacket[];
      return rows;
    } catch (error) {
      console.error('Error service:', error);
      throw error;
    }
  };

  public insert = async (exportReceiptDetail: ChiTietPhieuXuat) => {
    const connection = await pool.getConnection();
    try {
      connection.beginTransaction();
      const result = await this.chiTietPhieuXuatDAO.insert(exportReceiptDetail, connection);
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

  public update = async (exportReceiptDetail: ChiTietPhieuXuat) => {
    const connection = await pool.getConnection();
    try {
      connection.beginTransaction();
      const result = await this.chiTietPhieuXuatDAO.update(exportReceiptDetail, connection);
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

  public delete = async (packageProductId: string, exportReceiptId: string) => {
    const connection = await pool.getConnection();
    try {
      connection.beginTransaction();
      const result = await this.chiTietPhieuXuatDAO.delete(packageProductId, exportReceiptId, connection);
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
