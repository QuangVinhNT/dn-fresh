import { PoolConnection } from "mysql2/promise";
import { pool } from "../configs/database.js";
import { NhaCungCap } from "../models/nhaCungCapModel.js";

export class NhaCungCapDAO {

  public getAll = async (page: number, limit: number, providerName: string, status: string) => {
    const offset = (page - 1) * limit;
    const whereClause = [
      providerName.length > 0 ? `BINARY LOWER(tenNhaCungCap) LIKE LOWER('%${providerName}%')` : '',
      status.length > 0 ? `nhacungcap.trangThaiHoatDong IN (${status})` : ''
    ].filter(item => item.length > 0).join(' AND ');
    try {
      const [rows] = await pool.query(`
        SELECT maNhaCungCap, tenNhaCungCap, ngayDangKy, trangThaiHoatDong
        FROM nhacungcap
        ${whereClause.length > 0 ? `WHERE ${whereClause}` : ''}
        ORDER BY tenNhaCungCap ASC
        LIMIT ?
        OFFSET ?
        `, [limit, offset]);
      const [total] = await pool.query(`
        SELECT COUNT(DISTINCT maNhaCungCap) as total
        FROM nhacungcap
        ${whereClause.length > 0 ? `WHERE ${whereClause}` : ''}
        `);
      return {
        data: rows,
        total
      };
    } catch (error) {
      console.error(`DAO error: ${error}`);
      throw error;
    }
  };

  public insertProvider = async (provider: NhaCungCap, connection: PoolConnection) => {
    try {
      const result = connection.query(`
        INSERT INTO nhacungcap (maNhaCungCap, tenNhaCungCap, moTa, ngayThanhLap, ngayDangKy, maDiaChi, trangThaiHoatDong, giayToPhapLy, ngayCapNhat)
        VALUES (?, ?, ?, ?, NOW(), ?, ?, ?, NOW())
        `, [provider.getMaNhaCungCap(), provider.getTenNhaCungCap(), provider.getMoTa(), provider.getNgayThanhLap(), provider.getMaDiaChi(), provider.getTrangThaiHoatDong(), provider.getGiayToPhapLy()]);
      return result;
    } catch (error) {
      console.error(`DAO error: ${error}`);
      throw error;
    }
  };

  public getById = async (providerId: string) => {
    try {
      const [rows] = await pool.query(`
        SELECT *
        FROM nhacungcap
        WHERE maNhaCungCap = ?
        `, [providerId]);
      return rows;
    } catch (error) {
      console.error(`DAO error: ${error}`);
      throw error;
    }
  };

  public deleteProvider = async (providerId: string, connection: PoolConnection) => {
    try {
      const result = await connection.query(`
        DELETE FROM nhacungcap
        WHERE maNhaCungCap = ?
        `, [providerId]);
      return result;
    } catch (error) {
      console.error(`DAO error: ${error}`);
      throw error;
    }
  };

  public updateProvider = async (provider: NhaCungCap, connection: PoolConnection) => {
    try {
      const result = connection.query(`
        UPDATE nhacungcap
        SET tenNhaCungCap = ?, moTa = ?, ngayThanhLap = ?, maDiaChi = ?, trangThaiHoatDong = ?, giayToPhapLy = ?, ngayCapNhat = NOW()
        WHERE maNhaCungCap = ?
        `, [provider.getTenNhaCungCap(), provider.getMoTa(), provider.getNgayThanhLap(), provider.getMaDiaChi(), provider.getTrangThaiHoatDong(), provider.getGiayToPhapLy(), provider.getMaNhaCungCap()]);
      return result;
    } catch (error) {
      console.error(`DAO error: ${error}`);
      throw error;
    }
  };
}
