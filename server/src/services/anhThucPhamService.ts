import { RowDataPacket } from "mysql2";
import { AnhThucPhamDAO } from "../daos/anhThucPhamDAO.js";

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
}
