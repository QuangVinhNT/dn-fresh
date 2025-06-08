import { RowDataPacket } from "mysql2";
import { ChiTietPhieuXuatDAO } from "../daos/chiTietPhieuXuatDAO.js";

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
}
