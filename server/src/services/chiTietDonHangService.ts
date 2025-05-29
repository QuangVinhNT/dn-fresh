import { RowDataPacket } from "mysql2";
import { ChiTietDonHangDAO } from "../daos/chiTietDonHangDAO.js";
import { ChiTietDonHang } from "../models/chiTietDonHangModel.js";
import { PoolConnection } from "mysql2/promise";

export class ChiTietDonHangService {
  private chiTietDonHangDAO: ChiTietDonHangDAO;

  constructor() {
    this.chiTietDonHangDAO = new ChiTietDonHangDAO();
  }

  public getById = async (orderId: string) => {
    try {
       const rows = await this.chiTietDonHangDAO.getById(orderId) as RowDataPacket[];
      return rows;
    } catch (error) {
      console.error('Error service:', error);
      throw error;
    }
  }

  public insert = async (orderDetail: ChiTietDonHang, connection: PoolConnection) => {
    try {
      const result = await this.chiTietDonHangDAO.insert(orderDetail, connection);
      return result;
    } catch (error) {
      console.error(`Service error: ${error}`);
      throw error;
    }
  }
}
