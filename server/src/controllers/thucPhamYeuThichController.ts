import { Request, Response } from "express";
import { ThucPhamYeuThichService } from "../services/thucPhamYeuThichService.js";
import { ThucPhamYeuThich } from "../models/thucPhamYeuThichModel.js";

export class ThucPhamYeuThichController {
  private thucPhamYeuThichService: ThucPhamYeuThichService;

  constructor () {
    this.thucPhamYeuThichService = new ThucPhamYeuThichService();
  }

  public getAll = async (req: Request, res: Response) => {
    try {
      const page = parseInt(req.query.page as string) || 1;
      const limit = parseInt(req.query.limit as string) || 5;
      const userId = req.params.id as string || '';
      const data = await this.thucPhamYeuThichService.getAll(page, limit, userId);
      res.json(data);
    } catch (error) {
      console.error('Controller error:', error);
      res.status(500).json({ message: 'Server error' });
    }
  };

  public insert = async (req: Request, res: Response) => {
    try {
      const userId = req.params.id as string || '';
      const payload = req.body;
      if (!payload || !userId) {
        res.status(400).json({ message: 'Data not found!' });
        return;
      }
      const thucPhamYeuThich = new ThucPhamYeuThich(userId, payload.productId);
      const result = await this.thucPhamYeuThichService.insert(thucPhamYeuThich);
      res.status(201).json({
        success: true,
        message: 'Create favourite product success',
        info: result,
      });
    } catch (error) {
      console.error('Controller error:', error);
      res.status(500).json({ message: 'Server error' });
    }
  };

  public delete = async (req: Request, res: Response) => {
    try {
      const userId = req.params.id as string || '';
      const { productId } = req.query;
      if (!userId || !productId) {
        res.status(400).json({ message: 'Data not found!' });
        return;
      }
      const thucPhamYeuThich = new ThucPhamYeuThich(userId, productId as string);
      const result = await this.thucPhamYeuThichService.delete(thucPhamYeuThich);
      res.status(200).json({
        success: true,
        message: 'Delete favourite product success',
        info: result,
      });
    } catch (error) {
      console.error('Controller error:', error);
      res.status(500).json({ message: 'Server error' });
    }
  };
}
