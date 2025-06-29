import { Request, Response } from "express";
import { ThongKeService } from "../services/thongKeService.js";

export class ThongKeController {
  private thongKeService: ThongKeService;

  constructor () {
    this.thongKeService = new ThongKeService();
  }

  public getProfit = async (req: Request, res: Response) => {
    try {
      const data = await this.thongKeService.getProfit();
      res.json(data);
    } catch (error) {
      console.error(`Controller error: ${error}`);
      res.status(500).json({ message: 'Server error' });
    }
  };

  public getProductIsAboutToExpire = async (req: Request, res: Response) => {
    try {
      const data = await this.thongKeService.getProductIsAboutToExpire();
      res.json(data);
    } catch (error) {
      console.error(`Controller error: ${error}`);
      res.status(500).json({ message: 'Server error' });
    }
  };

  public getProductHasExpired = async (req: Request, res: Response) => {
    try {
      const data = await this.thongKeService.getProductHasExpired();
      res.json(data);
    } catch (error) {
      console.error(`Controller error: ${error}`);
      res.status(500).json({ message: 'Server error' });
    }
  };

  public getProductAlmostOutOfStock = async (req: Request, res: Response) => {
    try {
      const data = await this.thongKeService.getProductAlmostOutOfStock();
      res.json(data);
    } catch (error) {
      console.error(`Controller error: ${error}`);
      res.status(500).json({ message: 'Server error' });
    }
  };

  public getProductOutOfStock = async (req: Request, res: Response) => {
    try {
      const data = await this.thongKeService.getProductOutOfStock();
      res.json(data);
    } catch (error) {
      console.error(`Controller error: ${error}`);
      res.status(500).json({ message: 'Server error' });
    }
  };

  public getOrderQuantityWaitingProcess = async (req: Request, res: Response) => {
    try {
      const data = await this.thongKeService.getOrderQuantityWaitingProcess();
      res.json(data);
    } catch (error) {
      console.error(`Controller error: ${error}`);
      res.status(500).json({ message: 'Server error' });
    }
  };

  public getRevenueByMonth = async (req: Request, res: Response) => {
    try {
      const data = await this.thongKeService.getRevenueByMonth();
      res.json(data);
    } catch (error) {
      console.error(`Controller error: ${error}`);
      res.status(500).json({ message: 'Server error' });
    }
  };

  public getOrderQuantityByMonth = async (req: Request, res: Response) => {
    try {
      const data = await this.thongKeService.getOrderQuantityByMonth();
      res.json(data);
    } catch (error) {
      console.error(`Controller error: ${error}`);
      res.status(500).json({ message: 'Server error' });
    }
  };

  public getOrderQuantityByStatus = async (req: Request, res: Response) => {
    try {
      const data = await this.thongKeService.getOrderQuantityByStatus();
      res.json(data);
    } catch (error) {
      console.error(`Controller error: ${error}`);
      res.status(500).json({ message: 'Server error' });
    }
  };
}
