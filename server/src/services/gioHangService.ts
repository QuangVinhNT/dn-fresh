import { RowDataPacket } from "mysql2";
import { GioHangDAO } from "../daos/gioHangDAO.js";
import { AnhThucPhamDAO } from "../daos/anhThucPhamDAO.js";
import { GioHang } from "../models/gioHangModel.js";
import { pool } from "../configs/database.js";

export class GioHangService {
  private gioHangDAO: GioHangDAO;
  private anhThucPhamDAO: AnhThucPhamDAO;

  constructor () {
    this.gioHangDAO = new GioHangDAO();
    this.anhThucPhamDAO = new AnhThucPhamDAO();
  }

  public getAll = async (userId: string) => {
    try {
      const productCarts = await this.gioHangDAO.getAll(userId) as RowDataPacket[];
      const result = await Promise.all(productCarts.map(async (productCart) => (
        {
          ...productCart,
          hinhAnh: await this.anhThucPhamDAO.getOneByProductId(productCart.maThucPham)
        }
      )));
      return result;
    } catch (error) {
      console.error('Service error:', error);
      throw error;
    }
  };

  public insert = async (gioHang: GioHang) => {
    const connection = await pool.getConnection();
    try {
      connection.beginTransaction();
      const result = await this.gioHangDAO.insert(gioHang, connection);
      connection.commit();
      return result;
    } catch (error) {
      connection.rollback();
      console.error('Service error:', error);
      throw error;
    } finally {
      connection.release();
    }
  };

  public update = async (gioHang: GioHang) => {
    const connection = await pool.getConnection();
    try {
      connection.beginTransaction();
      const result = await this.gioHangDAO.update(gioHang, connection);
      connection.commit();
      return result;
    } catch (error) {
      connection.rollback();
      console.error('Service error:', error);
      throw error;
    } finally {
      connection.release();
    }
  };

  public delete = async (gioHang: GioHang) => {
    const connection = await pool.getConnection();
    try {
      connection.beginTransaction();
      const result = await this.gioHangDAO.delete(gioHang, connection);
      connection.commit();
      return result;
    } catch (error) {
      connection.rollback();
      console.error('Service error:', error);
      throw error;
    } finally {
      connection.release();
    }
  };
}
