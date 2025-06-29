import { RowDataPacket } from "mysql2";
import { DiaChiDAO } from "../daos/diaChiDAO.js";
import { DiaChi } from "../models/diaChiModel.js";
import { pool } from "../configs/database.js";
import generateUUID from "../utils/generateUUID.js";
import { PoolConnection } from "mysql2/promise";

export class DiaChiService {
  private diaChiDAO: DiaChiDAO;

  constructor () {
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

  public getDetailById = async (addressId: string) => {
    try {
      const rows = await this.diaChiDAO.getDetailById(addressId) as RowDataPacket[];
      if (rows.length === 0) {
        throw new Error(`No address found with ID: ${addressId}`);
      }
      return rows[0];
    } catch (error) {
      console.error(`Service error: ${error}`);
      throw error;
    }
  };

  public insertAddress = async (address: DiaChi, connection: PoolConnection) => {
    try {
      const result = await this.diaChiDAO.insertAddress(address, connection);
      return result;
    } catch (error) {
      console.error(`Service error: ${error}`);
      throw error;
    }
  };

  public getIdByTheRestField = async (addressDetail: string, communeId: string) => {
    try {
      const addressId = await this.diaChiDAO.getIdByTheRestField(addressDetail, communeId) as RowDataPacket[];
      return addressId;
    } catch (error) {
      console.error(`Service error: ${error}`);
      throw error;
    }
  };

  public getAllCity = async () => {
    try {
      const result = await this.diaChiDAO.getAllCity();
      return result;
    } catch (error) {
      console.error(`Service error: ${error}`);
      throw error;
    }
  };

  public getAllCommuneByCityId = async (cityId: string) => {
    try {
      const result = await this.diaChiDAO.getAllCommuneByCityId(cityId);
      return result;
    } catch (error) {
      console.error(`Service error: ${error}`);
      throw error;
    }
  };

  public getWorkCommuneIdByUserId = async (userId: string) => {
    try {
      const result = await this.diaChiDAO.getWorkCommuneIdByUserId(userId) as RowDataPacket[];
      return result[0];
    } catch (error) {
      console.error(`Service error: ${error}`);
      throw error;
    }
  };
}
