import { RowDataPacket } from "mysql2";
import { NguoiDungDAO } from "../daos/nguoiDungDAO.js";
import { NguoiDungDTO } from "../dtos/nguoiDungDTO.js";

export class NguoiDungService {
  private nguoiDungDAO: NguoiDungDAO;

  constructor () {
    this.nguoiDungDAO = new NguoiDungDAO();
  }

  public getAllCustomer = async (page: number, limit: number, customerId: string, status: string) => {
    try {
      const rows = await this.nguoiDungDAO.getAllCustomer(page, limit, customerId, status);
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

  public getAllStaff = async (page: number, limit: number, staffId: string, status: string, roleId: string) => {
    try {
      const rows = await this.nguoiDungDAO.getAllStaff(page, limit, staffId, status, roleId);
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

  public getById = async (userId: string): Promise<NguoiDungDTO> => {
    try {
      const rows = await this.nguoiDungDAO.getById(userId) as RowDataPacket[];
      return rows[0] as NguoiDungDTO;
    } catch (error) {
      console.error('Error service:', error);
      throw error;
    }
  };
}
