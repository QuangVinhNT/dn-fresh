import { RowDataPacket } from "mysql2";
import { PhieuNhapDAO } from "../daos/phieuNhapDAO.js";
import { ChiTietThucPhamNhapService } from "./chiTietThucPhamNhapService.js";
import { PhieuNhap } from "../models/phieuNhapModel.js";
import { pool } from "../configs/database.js";
import generateUUID from "../utils/generateUUID.js";

export class PhieuNhapService {
  private phieuNhapDAO: PhieuNhapDAO;
  private chiTietThucPhamNhapService: ChiTietThucPhamNhapService;

  constructor () {
    this.phieuNhapDAO = new PhieuNhapDAO();
    this.chiTietThucPhamNhapService = new ChiTietThucPhamNhapService();
  }

  public getAll = async (page: number, limit: number, importReceiptId: string, status: string) => {
    try {
      const rows = await this.phieuNhapDAO.getAll(page, limit, importReceiptId, status);
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

  public getById = async (importReceiptId: string) => {
    try {
      const rows = await this.phieuNhapDAO.getById(importReceiptId) as RowDataPacket[];
      const importReceipt = rows[0];
      const products = await this.chiTietThucPhamNhapService.getAllByImportReceiptId(importReceiptId);
      return {
        ...importReceipt,
        danhSachThucPham: products
      };
    } catch (error) {
      console.error('Error service:', error);
      throw error;
    }
  };

  public insert = async (importReceipt: PhieuNhap) => {
    const connection = await pool.getConnection();
    try {
      connection.beginTransaction();
      const importReceiptId = await generateUUID(255, connection, 'phieunhap', 'maPhieuNhap', 'PN');
      importReceipt.setMaPhieuNhap(importReceiptId);
      const result = await this.phieuNhapDAO.insert(importReceipt, connection);
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

  public softDelete = async (importReceiptId: string, adminId: string) => {
    const connection = await pool.getConnection();
    try {
      connection.beginTransaction();
      const result = await this.phieuNhapDAO.softDelete(importReceiptId, adminId, connection);
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

  public update = async (importReceipt: PhieuNhap) => {
    const connection = await pool.getConnection();
    try {
      connection.beginTransaction();
      const result = await this.phieuNhapDAO.update(importReceipt, connection);
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

  public approveImportReceipt = async (importReceiptId: string, adminId: string) => {
    const connection = await pool.getConnection();
    try {
      connection.beginTransaction();
      const result = await this.phieuNhapDAO.approveImportReceipt(importReceiptId, adminId, connection);
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

  public getAllForStaff = async (page: number, limit: number, importReceiptId: string, status: string) => {
    try {
      const rows = await this.phieuNhapDAO.getAllForStaff(page, limit, importReceiptId, status);
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

  public requestApproveImportReceipt = async (importReceiptId: string, staffId: string) => {
    const connection = await pool.getConnection();
    try {
      connection.beginTransaction();
      const result = await this.phieuNhapDAO.requestApproveImportReceipt(importReceiptId, staffId, connection);
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
