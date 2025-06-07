import { RowDataPacket } from "mysql2";
import { ChiTietThucPhamNhapDAO } from "../daos/chiTietThucPhamNhapDAO.js";

export class ChiTietThucPhamNhapService {
  private chiTietThucPhamNhapDAO: ChiTietThucPhamNhapDAO;

  constructor () {
    this.chiTietThucPhamNhapDAO = new ChiTietThucPhamNhapDAO();
  }

  public getById = async (productId: string) => {
    try {
      const rows = await this.chiTietThucPhamNhapDAO.getById(productId) as RowDataPacket[];
      return rows;
    } catch (error) {
      console.error('Error service:', error);
      throw error;
    }
  };

  public getAllByProviderId = async (providerId: string) => {
    try {
      const rows = await this.chiTietThucPhamNhapDAO.getAllByProviderId(providerId) as RowDataPacket[];
      return rows;
    } catch (error) {
      console.error('Error service:', error);
      throw error;
    }
  };
}
