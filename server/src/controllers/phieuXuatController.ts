import { Request, Response } from "express";
import { PhieuXuatService } from "../services/phieuXuatService.js";

export class PhieuXuatController {
  private phieuXuatService: PhieuXuatService;

  constructor () {
    this.phieuXuatService = new PhieuXuatService();
  }

  public getAll = async (req: Request, res: Response) => {
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 10;
    const exportReceiptId = req.query.search as string || '';
    const rawStatus = req.query.status as string || '';
    const status = rawStatus === 'undefined' ? '' : rawStatus.split(',').map(s => `'${s}'`).join(',');
    try {
      const data = await this.phieuXuatService.getAll(page, limit, exportReceiptId, status);
      res.json(data);
    } catch (error) {
      console.error(`Controller error: ${error}`);
      res.status(500).json({ message: 'Server error' });
    }
  };
}
