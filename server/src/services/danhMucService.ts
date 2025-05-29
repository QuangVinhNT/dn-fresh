import { RowDataPacket } from "mysql2";
import { DanhMucDAO } from "../daos/danhMucDAO.js";
import { DanhMuc } from "../models/danhMucModel.js";
import { pool } from "../configs/database.js";
import generateUUID from "../utils/generateUUID.js";

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
      throw error;
    }
  };

  public getAllForFilter = async () => {
    try {
      const rows = await this.danhMucDAO.getAllForFilter();
      return rows;
    } catch (error) {
      console.error(`Service error: ${error}`);
      throw error;
    }
  };

  public getAllForSelectBox = async () => {
    try {
      const rows = await this.danhMucDAO.getAllForSelectBox();
      return rows;
    } catch (error) {
      console.error(`Service error: ${error}`);
      throw error;
    }
  };

  public getById = async (categoryId: string) => {
    try {
      const rows = await this.danhMucDAO.getById(categoryId) as RowDataPacket[];
      return rows[0];
    } catch (error) {
      console.error(`Service error: ${error}`);
      throw error;
    }
  };

  public insertCategory = async (category: DanhMuc) => {
    const connection = await pool.getConnection();
    try {
      connection.beginTransaction();
      const categoryId = await generateUUID(6, connection, 'danhmuc', 'maDanhMuc', 'DM');
      category.setMaDanhMuc(categoryId);
      const result = await this.danhMucDAO.insertCategory(category, connection);
      connection.commit();
      return result;
    } catch (error) {
      connection.rollback();
      console.error(`Service error: ${error}`);
      throw error;
    } finally {
      connection.release();
    }
  };

  public updateCategory = async (category: DanhMuc) => {
    const connection = await pool.getConnection();
    try {
      connection.beginTransaction();
      const result = await this.danhMucDAO.updateCategory(category, connection);
      connection.commit();
      return result;
    } catch (error) {
      connection.rollback();
      console.error(`Service error: ${error}`);
      throw error;
    } finally {
      connection.release();
    }
  };

  public deleteCategory = async (categoryId: string) => {
    const connection = await pool.getConnection();
    try {
      connection.beginTransaction();
      const result = await this.danhMucDAO.deleteCategory(categoryId, connection);
      connection.commit();
      return result;
    } catch (error) {
      connection.rollback();
      console.error(`Service error: ${error}`);
      throw error;
    } finally {
      connection.release();
    }
  };
}
