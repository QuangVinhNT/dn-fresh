import { RowDataPacket } from "mysql2";
import { KhoThucPhamDAO } from "../daos/khoThucPhamDAO.js";

export class KhoThucPhamService {
  private khoThucPhamDAO: KhoThucPhamDAO;

  constructor () {
    this.khoThucPhamDAO = new KhoThucPhamDAO();
  }

  public getAll = async (page: number, limit: number, categoryId: string, orderBy: { columnName: string, direction: string; }, productName: string) => {
    try {
      const rows = await this.khoThucPhamDAO.getAll(page, limit, categoryId, orderBy, productName);
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

  public getById = async (productId: string) => {
    try {
      const rows = (await this.khoThucPhamDAO.getById(productId) as RowDataPacket)[0];
      return rows;
    } catch (error) {
      console.error('Error service:', error);
      throw error;
    }
  };

  public getAllDiscount = async () => {
    try {
      const rows = await this.khoThucPhamDAO.getAllDiscount();
      return rows;
    } catch (error) {
      console.error('Error service:', error);
      throw error;
    }
  };
}
