import { RowDataPacket } from "mysql2";
import { PhieuXuatDAO } from "../daos/phieuXuatDAO.js";
import { PhieuXuat } from "../models/phieuXuatModel.js";
import { pool } from "../configs/database.js";
import generateUUID from "../utils/generateUUID.js";
import { ChiTietPhieuXuatService } from "./chiTietPhieuXuatService.js";

export class PhieuXuatService {
  private phieuXuatDAO: PhieuXuatDAO;
  private chiTietPhieuXuatService: ChiTietPhieuXuatService;

  constructor () {
    this.phieuXuatDAO = new PhieuXuatDAO();
    this.chiTietPhieuXuatService = new ChiTietPhieuXuatService();
  }

  public getAll = async (page: number, limit: number, exportReceiptId: string, status: string) => {
    try {
      const rows = await this.phieuXuatDAO.getAll(page, limit, exportReceiptId, status);
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

  public getById = async (exportReceiptId: string) => {
    try {
      const rows = await this.phieuXuatDAO.getById(exportReceiptId) as RowDataPacket[];
      const exportReceipt = rows[0];
      const products = await this.chiTietPhieuXuatService.getAllByExportReceiptId(exportReceiptId);
      return {
        ...exportReceipt,
        danhSachThucPham: products
      };
    } catch (error) {
      console.error('Error service:', error);
      throw error;
    }
  };

  public insert = async (exportReceipt: PhieuXuat) => {
    const connection = await pool.getConnection();
    try {
      connection.beginTransaction();
      const exportReceiptId = await generateUUID(255, connection, 'phieuxuat', 'maPhieuXuat', 'PX');
      exportReceipt.setMaPhieuXuat(exportReceiptId);
      const result = await this.phieuXuatDAO.insert(exportReceipt, connection);
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

  public softDelete = async (exportReceiptId: string, adminId: string) => {
    const connection = await pool.getConnection();
    try {
      connection.beginTransaction();
      const result = await this.phieuXuatDAO.softDelete(exportReceiptId, adminId, connection);
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

  public update = async (exportReceipt: PhieuXuat) => {
    const connection = await pool.getConnection();
    try {
      connection.beginTransaction();
      const result = await this.phieuXuatDAO.update(exportReceipt, connection);
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

  public approveExportReceipt = async (exportReceiptId: string, adminId: string) => {
    const connection = await pool.getConnection();
    try {
      connection.beginTransaction();
      const result = await this.phieuXuatDAO.approveExportReceipt(exportReceiptId, adminId, connection);
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

  public getAllForStaff = async (page: number, limit: number, exportReceiptId: string, status: string) => {
    try {
      const rows = await this.phieuXuatDAO.getAllForStaff(page, limit, exportReceiptId, status);
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

  public requestApproveExportReceipt = async (exportReceiptId: string, staffId: string) => {
    const connection = await pool.getConnection();
    try {
      connection.beginTransaction();
      const result = await this.phieuXuatDAO.requestApproveExportReceipt(exportReceiptId, staffId, connection);
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
}
