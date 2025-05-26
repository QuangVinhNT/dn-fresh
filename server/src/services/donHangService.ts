import { RowDataPacket } from "mysql2";
import { DonHangDAO } from "../daos/donHangDAO.js";

export class DonHangService {
  private donHangDAO: DonHangDAO

  constructor() {
    this.donHangDAO = new DonHangDAO();
  }

  public getAll = async (page: number, limit: number, userId: string, orderId: string) => {
    try {
      const rows = await this.donHangDAO.getAll(page, limit, userId, orderId);
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

}
