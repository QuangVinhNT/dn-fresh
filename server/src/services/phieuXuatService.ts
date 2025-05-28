import { RowDataPacket } from "mysql2";
import { PhieuXuatDAO } from "../daos/phieuXuatDAO.js";

export class PhieuXuatService {
  private phieuXuatDAO: PhieuXuatDAO;

  constructor() {
    this.phieuXuatDAO = new PhieuXuatDAO();
  }

  public getAll = async (page: number, limit: number, exportReceiptId: string, status: string) => {
    try {
      const rows = await this.phieuXuatDAO.getAll(page, limit, exportReceiptId, status);
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
