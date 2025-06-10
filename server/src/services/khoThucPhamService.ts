import { QueryResult, RowDataPacket } from "mysql2";
import { KhoThucPhamDAO } from "../daos/khoThucPhamDAO.js";
import { ChiTietThucPhamNhapService } from "./chiTietThucPhamNhapService.js";
import { pool } from "../configs/database.js";
import generateUUID from "../utils/generateUUID.js";
import { KhoThucPham } from "../models/khoThucPhamModel.js";
import { AnhThucPham } from "../models/anhThucPhamModel.js";
import { AnhThucPhamService } from "./anhThucPhamService.js";

export class KhoThucPhamService {
  private khoThucPhamDAO: KhoThucPhamDAO;
  private chiTietThucPhamNhapService: ChiTietThucPhamNhapService;
  private anhThucPhamService: AnhThucPhamService;

  constructor () {
    this.khoThucPhamDAO = new KhoThucPhamDAO();
    this.chiTietThucPhamNhapService = new ChiTietThucPhamNhapService();
    this.anhThucPhamService = new AnhThucPhamService();
  }

  public getAll = async (page: number, limit: number, categoryId: string, orderBy: { columnName: string, direction: string; }, productName: string) => {
    try {
      const rows = await this.khoThucPhamDAO.getAll(page, limit, categoryId, orderBy, productName);
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

  public getById = async (productId: string) => {
    try {
      const rows = (await this.khoThucPhamDAO.getById(productId) as RowDataPacket)[0];
      return rows;
    } catch (error) {
      console.error('Error service:', error);
      throw error;
    }
  };

  public getAllDiscount = async () => {
    try {
      const rows = await this.khoThucPhamDAO.getAllDiscount();
      return rows;
    } catch (error) {
      console.error('Error service:', error);
      throw error;
    }
  };

  public getAllForAdmin = async (page: number, limit: number, productName: string, status: string, category: string) => {
    try {
      const rows = await this.khoThucPhamDAO.getAllForAdmin(page, limit, productName, status, category);
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

  public getByIdForAdmin = async (productId: string) => {
    try {
      const product = (await this.khoThucPhamDAO.getByIdForAdmin(productId) as RowDataPacket)[0];
      const productPackages = await this.chiTietThucPhamNhapService.getById(productId);
      return { product, productPackages };
    } catch (error) {
      console.error('Error service:', error);
      throw error;
    }
  };

  public insertProduct = async (product: KhoThucPham, imageUrls: string[]) => {
    const connection = await pool.getConnection();
    try {
      connection.beginTransaction();
      const productId = await generateUUID(10, connection, 'khothucpham', 'maThucPham', 'TP');
      product.setMaThucPham(productId);
      const productResult = await this.khoThucPhamDAO.insertProduct(product, connection);
      const productImageResult = await Promise.all(imageUrls.map(async (imageUrl) => {
        const imageId = await generateUUID(10, connection, 'anhthucpham', 'maAnh', 'IMG');
        return this.anhThucPhamService.insertProductImage(new AnhThucPham(imageId, productId, imageUrl), connection);
      }));
      connection.commit();
      return { result: { productResult, productImageResult } };
    } catch (error) {
      connection.rollback();
      console.error('Error service:', error);
      throw error;
    } finally {
      connection.release();
    }
  };

  public updateProduct = async (product: KhoThucPham, imageUrls: string[]) => {
    const connection = await pool.getConnection();
    try {
      connection.beginTransaction();
      const productResult = await this.khoThucPhamDAO.updateProduct(product, connection);
      let productImageResult: QueryResult[];
      if (imageUrls.length > 0) {
        await this.anhThucPhamService.deleteProductImage(product.getMaThucPham(), connection);
        productImageResult = await Promise.all(imageUrls.map(async (imageUrl) => {
          const imageId = await generateUUID(10, connection, 'anhthucpham', 'maAnh', 'IMG');
          return this.anhThucPhamService.insertProductImage(new AnhThucPham(imageId, product.getMaThucPham(), imageUrl), connection);
        }));
      } else {
        productImageResult = [];
      }
      connection.commit();
      return { result: { productResult, productImageResult } };
    } catch (error) {
      connection.rollback();
      console.error('Error service:', error);
      throw error;
    } finally {
      connection.release();
    }
  };

  public deleteProduct = async (productId: string) => {
    const connection = await pool.getConnection();
    try {
      connection.beginTransaction();
      const productResult = await this.khoThucPhamDAO.deleteProduct(productId, connection);
      connection.commit();
      return { result: { productResult } };
    } catch (error) {
      connection.rollback();
      console.error('Error service:', error);
      throw error;
    } finally {
      connection.release();
    }
  };
}
