import { Request, Response } from "express";
import { DonHangService } from "../services/donHangService.js";

export class DonHangController {
  private donHangService: DonHangService;

  constructor () {
    this.donHangService = new DonHangService();
  }

  public getAll = async (req: Request, res: Response) => {
    try {
      const page = parseInt(req.query.page as string) || 1;
      const limit = parseInt(req.query.limit as string) || 5;
      const userId = req.query.userId as string || '';
      const orderId = req.query.search as string || '';
      const data = await this.donHangService.getAll(page, limit, userId, orderId);
      res.json(data);
    } catch (error) {
      console.error('Controller error:', error);
      res.status(500).json({ message: 'Server error' });
    }
  };

  public getById = async (req: Request, res: Response) => {
    try {
      const orderId = req.params.id;
      const order = await this.donHangService.getById(orderId);
      res.json(order);
    } catch (error) {
      console.error('Controller error:', error);
      res.status(500).json({ message: 'Server error' });
    }
  };

  public getAllForAdmin = async (req: Request, res: Response) => {
    try {
      const page = parseInt(req.query.page as string) || 1;
      const limit = parseInt(req.query.limit as string) || 5;
      const orderId = req.query.search as string || '';
      const rawStatus = req.query.status as string || '';
      const status = rawStatus === 'undefined' ? '' : rawStatus.split(',').map(s => `'${s}'`).join(','); 
      const data = await this.donHangService.getAllForAdmin(page, limit, orderId, status);
      res.json(data);
    } catch (error) {
      console.error('Controller error:', error);
      res.status(500).json({ message: 'Server error' });
    }
  }
}
