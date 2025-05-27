import { RowDataPacket } from "mysql2";
import { DiaChiDAO } from "../daos/diaChiDAO.js";

export class DiaChiService {
  private diaChiDAO: DiaChiDAO;

  constructor() {
    this.diaChiDAO = new DiaChiDAO();
  }

  public getById = async (addressId: string) => {
    try {
      const address = await this.diaChiDAO.getById(addressId) as RowDataPacket[];
      if (address.length === 0) {
        throw new Error(`No address found with ID: ${addressId}`);
      }
      return address[0].diaChi;
    } catch (error) {
      console.error(`Service error: ${error}`);
      throw error;
    }
  };
}
