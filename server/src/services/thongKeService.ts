import { RowDataPacket } from "mysql2";
import { ThongKeDAO } from "../daos/thongKeDAO.js";

export class ThongKeService {
  private thongKeDAO: ThongKeDAO;

  constructor () {
    this.thongKeDAO = new ThongKeDAO();
  }

  public getProfit = async () => {
    try {
      const rows = await this.thongKeDAO.getProfit() as RowDataPacket[];
      return rows[0];
    } catch (error) {
      console.error('Error service:', error);
      throw error;
    }
  };

  public getProductIsAboutToExpire = async () => {
    try {
      const rows = await this.thongKeDAO.getProductIsAboutToExpire();
      const quantity = rows.quantity as RowDataPacket[];
      return {
        products: rows.products,
        quantity: quantity[0].soLuong
      };
    } catch (error) {
      console.error('Error service:', error);
      throw error;
    }
  };

  public getProductHasExpired = async () => {
    try {
      const rows = await this.thongKeDAO.getProductHasExpired();
      const quantity = rows.quantity as RowDataPacket[];
      return {
        products: rows.products,
        quantity: quantity[0].soLuong
      };
    } catch (error) {
      console.error('Error service:', error);
      throw error;
    }
  };

  public getProductAlmostOutOfStock = async () => {
    try {
      const rows = await this.thongKeDAO.getProductAlmostOutOfStock();
      const quantity = rows.quantity as RowDataPacket[];
      return {
        products: rows.products,
        quantity: quantity[0].soLuong
      };
    } catch (error) {
      console.error('Error service:', error);
      throw error;
    }
  };

  public getProductOutOfStock = async () => {
    try {
      const rows = await this.thongKeDAO.getProductOutOfStock();
      const quantity = rows.quantity as RowDataPacket[];
      return {
        products: rows.products,
        quantity: quantity[0].soLuong
      };
    } catch (error) {
      console.error('Error service:', error);
      throw error;
    }
  };

  public getOrderQuantityWaitingProcess = async () => {
    try {
      const rows = await this.thongKeDAO.getOrderQuantityWaitingProcess() as RowDataPacket[];
      return rows[0];
    } catch (error) {
      console.error('Error service:', error);
      throw error;
    }
  };

  public getRevenueByMonth = async () => {
    try {
      const rows = await this.thongKeDAO.getRevenueByMonth() as RowDataPacket[];
      return rows;
    } catch (error) {
      console.error('Error service:', error);
      throw error;
    }
  };

  public getOrderQuantityByMonth = async () => {
    try {
      const rows = await this.thongKeDAO.getOrderQuantityByMonth() as RowDataPacket[];
      return rows;
    } catch (error) {
      console.error('Error service:', error);
      throw error;
    }
  };

  public getOrderQuantityByStatus = async () => {
    try {
      const rows = await this.thongKeDAO.getOrderQuantityByStatus();
      const cancelOrder = rows.cancelOrder as RowDataPacket[];
      const finishOrder = rows.finishOrder as RowDataPacket[];
      return [
        { name: 'Tỉ lệ hủy', value: cancelOrder[0].soLuong },
        { name: 'Tỉ lệ hoàn thành', value: finishOrder[0].soLuong }
      ];
    } catch (error) {
      console.error('Error service:', error);
      throw error;
    }
  };
}
