import { RowDataPacket } from "mysql2";
import { DanhMucDAO } from "../daos/danhMucDAO.js";

export class DanhMucService {
  private danhMucDAO: DanhMucDAO;

  constructor () {
    this.danhMucDAO = new DanhMucDAO();
  }

  public getAll = async (page: number, limit: number, categoryName: string, status: string) => {
    try {
      const rows = await this.danhMucDAO.getAll(page, limit, categoryName, status);
      const total = rows.total as RowDataPacket[];
      return {
        data: rows.data,
        total: total[0].total
      };
    } catch (error) {
      console.error(`Service error: ${error}`);
    }
  };

  public getAllForFilter = async () => {
    try {
      const rows = await this.danhMucDAO.getAllForFilter();
      return rows;
    } catch (error) {
      console.error(`Service error: ${error}`);
    }
  };

  public getAllForSelectBox = async () => {
    try {
      const rows = await this.danhMucDAO.getAllForSelectBox();
      return rows;
    } catch (error) {
      console.error(`Service error: ${error}`);
    }
  };
}
