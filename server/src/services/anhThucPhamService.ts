import { RowDataPacket } from "mysql2";
import { AnhThucPhamDAO } from "../daos/anhThucPhamDAO.js";
import { AnhThucPham } from "../models/anhThucPhamModel.js";
import { PoolConnection } from "mysql2/promise";

export class AnhThucPhamService {
  private anhThucPhamDAO: AnhThucPhamDAO;

  constructor() {
    this.anhThucPhamDAO = new AnhThucPhamDAO();
  }

  public getOneByProductId = async (productId: string) => {
    try {
      const image = await this.anhThucPhamDAO.getOneByProductId(productId) as RowDataPacket[];
      if (image.length === 0) {
        throw new Error(`No image found for product ID: ${productId}`);
      }
      return image[0].hinhAnh;
    } catch (error) {
      console.error(`Service error: ${error}`);
      throw error;
    }
  };

  public insertProductImage = async (productImage: AnhThucPham, connection: PoolConnection) => {
    try {
      const result = await this.anhThucPhamDAO.insertProductImage(productImage, connection);
      return result;
    } catch (error) {
      console.error(`Service error: ${error}`);
      throw error;
    }
  };

  public deleteProductImage = async (productId: string, connection: PoolConnection) => {
    try {
      const result = await this.anhThucPhamDAO.deleteProductImage(productId, connection);
      return result;
    } catch (error) {
      console.error(`Service error: ${error}`);
      throw error;
    }
  }
}
