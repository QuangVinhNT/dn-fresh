import { PoolConnection } from "mysql2/promise";
import { pool } from "../configs/database.js";
import { DiaChi } from "../models/diaChiModel.js";

export class DiaChiDAO {
  public getById = async (addressId: string) => {
    try {
      const [rows] = await pool.query(`
        SELECT CONCAT(
          dc.chiTietDiaChi, ', ',
          px.tenPhuongXa, ', ',
          tp.tenTinhThanhPho
        ) AS diaChi
        FROM DIACHI dc
        JOIN PHUONGXA px ON dc.maPhuongXa = px.maPhuongXa
        JOIN TINHTHANHPHO tp ON px.maTinhThanhPho = tp.maTinhThanhPho
        WHERE dc.maDiaChi = ?;
        `, [addressId]);
      return rows;
    } catch (error) {
      console.error('DAO error:', error);
      throw error;
    }
  };

  public insertAddress = async (address: DiaChi, connection: PoolConnection) => {
    try {
      const [result] = await connection.query(`
        INSERT INTO diachi (maDiaChi, chiTietDiaChi, maPhuongXa)
        VALUES (?, ?, ?)
      `, [address.getMaDiaChi(), address.getChiTietDiaChi(), address.getMaPhuongXa()]);
      return result;
    } catch (error) {
      console.error('DAO error:', error)
      throw error
    }
  } 

  public getIdByTheRestField = async (addressDetail: string, communeId: string) => {
    try {
      const [rows] = await pool.query(`
        SELECT maDiaChi
        FROM diachi AS dc
        WHERE BINARY LOWER(dc.chiTietDiaChi) = LOWER(?) AND maPhuongXa = ?;
        `, [addressDetail, communeId]);
      return rows;
    } catch (error) {
      console.error('DAO error:', error);
      throw error;
    }
  }

  public getAllCity = async () => {
    try {
      const [rows] = await pool.query(`
        SELECT maTinhThanhPho, tenTinhThanhPho
        FROM tinhthanhpho
        ORDER BY tenTinhThanhPho
        `);
      return rows;
    } catch (error) {
      console.error('DAO error:', error);
      throw error;
    }
  }

  public getAllCommuneByCityId = async (cityId: string) => {
    try {
      const [rows] = await pool.query(`
        SELECT maPhuongXa, tenPhuongXa
        FROM phuongxa
        WHERE maTinhThanhPho = ?
        `, [cityId]);
      return rows;
    } catch (error) {
      console.error('DAO error:', error);
      throw error;
    }
  }
}
