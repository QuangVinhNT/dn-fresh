import { Request, Response } from "express";
import { DanhMucService } from "../services/danhMucService.js";

export class DanhMucController {
  private danhMucService: DanhMucService;

  constructor() {
    this.danhMucService = new DanhMucService();
  }
  
  public getAll = async (req: Request, res: Response) => {
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 10;
    const categoryName = req.query.categoryName as string || '';
    const rawStatus = req.query.status as string || '';
     const status = rawStatus === 'undefined' ? '' : rawStatus.split(',').map(s => `'${s}'`).join(',');
    try {
      const data = await this.danhMucService.getAll(page, limit, categoryName, status);
      res.json(data);
    } catch (error) {
      console.error(`Controller error: ${error}`);
      res.status(500).json({ message: 'Server error' });
    }
  };

  public getAllForFilter = async (req: Request, res: Response) => {
    try {
      const data = await this.danhMucService.getAllForFilter();
      res.json(data);
    } catch (error) {
      console.error(`Controller error: ${error}`);
      res.status(500).json({ message: 'Server error' });
    }
  };

  public getAllForSelectBox = async (req: Request, res: Response) => {
    try {
      const data = await this.danhMucService.getAllForSelectBox();
      res.json(data);
    } catch (error) {
      console.error(`Controller error: ${error}`);
      res.status(500).json({ message: 'Server error' });
    }
  };
}
