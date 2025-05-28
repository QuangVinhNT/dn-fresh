import { RowDataPacket } from "mysql2";
import { PhieuNhapDAO } from "../daos/phieuNhapDAO.js";

export class PhieuNhapService {
  private phieuNhapDAO: PhieuNhapDAO;

  constructor() {
    this.phieuNhapDAO = new PhieuNhapDAO();
  }

  public getAll = async (page: number, limit: number, importReceiptId: string, status: string) => {
    try {
      const rows = await this.phieuNhapDAO.getAll(page, limit, importReceiptId, status);
      const total = rows.total as RowDataPacket[];
      return {
        data: rows.data,
        total: total[0].total
      };
    } catch (error) {
      console.error('Error service:', error);
      throw error;
    }
  }
}
