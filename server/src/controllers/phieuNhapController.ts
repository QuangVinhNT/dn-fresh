import { Request, Response } from "express";
import { PhieuNhapService } from "../services/phieuNhapService.js";

export class PhieuNhapController {
  private phieuNhapService: PhieuNhapService;

  constructor() {
    this.phieuNhapService = new PhieuNhapService();
  }

  public getAll = async (req: Request, res: Response) => {
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 10;
    const importReceiptId = req.query.search as string || '';
    const rawStatus = req.query.status as string || '';
     const status = rawStatus === 'undefined' ? '' : rawStatus.split(',').map(s => `'${s}'`).join(',');
    try {
      const data = await this.phieuNhapService.getAll(page, limit, importReceiptId, status);
      res.json(data);
    } catch (error) {
      console.error('Error controller:', error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  };
}
