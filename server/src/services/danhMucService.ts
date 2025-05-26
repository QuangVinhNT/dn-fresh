import { DanhMucDAO } from "../daos/danhMucDAO.js";

export class DanhMucService {
  private danhMucDAO: DanhMucDAO;

  constructor () {
    this.danhMucDAO = new DanhMucDAO();
  }

  public getAllForFilter = async () => {
    try {
      const rows = await this.danhMucDAO.getAllForFilter();
      return rows;
    } catch (error) {
      console.error(`Service error: ${error}`);
    }
  };
}
