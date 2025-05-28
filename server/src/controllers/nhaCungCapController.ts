import { Request, Response } from "express";
import { NhaCungCapService } from "../services/nhaCungCapService.js";

export class NhaCungCapController {
  private nhaCungCapService: NhaCungCapService;

  constructor() {
    this.nhaCungCapService = new NhaCungCapService();
  }

  public getAll = async(req: Request, res: Response) => {
    try {
      const page = parseInt(req.query.page as string) || 1;
      const limit = parseInt(req.query.limit as string) || 5;
      const providerName = req.query.search as string || '';
      const rawStatus = req.query.status as string;
      const status = rawStatus === 'undefined' ? '' : rawStatus.split(',').map(s => `'${s}'`).join(',');
      const data = await this.nhaCungCapService.getAll(page, limit, providerName, status);
      res.json(data);
    } catch (error) {
      console.error('Controller error:', error);
      res.status(500).json({ message: 'Server error' });
    }
  }
}
