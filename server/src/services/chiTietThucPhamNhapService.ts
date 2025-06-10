import { RowDataPacket } from "mysql2";
import { pool } from "../configs/database.js";
import { ChiTietThucPhamNhapDAO } from "../daos/chiTietThucPhamNhapDAO.js";
import { ChiTietThucPhamNhap } from "../models/chiTietThucPhamNhapModel.js";
import generateUUID from "../utils/generateUUID.js";

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

  public getAllByImportReceiptId = async (importReceiptId: string) => {
    try {
      const rows = await this.chiTietThucPhamNhapDAO.getAllByImportReceiptId(importReceiptId) as RowDataPacket[];
      return rows;
    } catch (error) {
      console.error('Error service:', error);
      throw error;
    }
  };

  public insert = async (product: ChiTietThucPhamNhap) => {
    const connection = await pool.getConnection();
    try {
      connection.beginTransaction();
      const packageProductId = await generateUUID(255, connection, 'chitietthucphamnhap', 'maLoHang', 'LH');
      product.setMaLoHang(packageProductId);
      const result = await this.chiTietThucPhamNhapDAO.insert(product, connection);
      connection.commit();
      return result;
    } catch (error) {
      connection.rollback();
      console.error('Error service:', error);
      throw error;
    } finally {
      connection.release();
    }
  };

  public update = async (product: ChiTietThucPhamNhap) => {
    const connection = await pool.getConnection();
    try {
      connection.beginTransaction();
      const result = await this.chiTietThucPhamNhapDAO.update(product, connection);
      connection.commit();
      return result;
    } catch (error) {
      connection.rollback();
      console.error('Error service:', error);
      throw error;
    } finally {
      connection.release();
    }
  };

  public delete = async (productPackageId: string) => {
    const connection = await pool.getConnection();
    try {
      connection.beginTransaction();
      const result = await this.chiTietThucPhamNhapDAO.delete(productPackageId, connection);
      connection.commit();
      return result;
    } catch (error) {
      connection.rollback();
      console.error('Error service:', error);
      throw error;
    } finally {
      connection.release();
    }
  }
}
