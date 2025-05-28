import { RowDataPacket } from "mysql2";
import { NhaCungCapDAO } from "../daos/nhaCungCapDAO.js";

export class NhaCungCapService {
  private nhaCungCapDAO: NhaCungCapDAO;

  constructor() {
    this.nhaCungCapDAO = new NhaCungCapDAO();
  }

  public getAll = async (page: number, limit: number, providerName: string, status: string) => {
    try {
      const rows = await this.nhaCungCapDAO.getAll(page, limit, providerName, status);
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
