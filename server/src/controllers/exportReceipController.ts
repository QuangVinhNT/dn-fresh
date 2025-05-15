import { Request, Response } from "express";
import * as ExportReceiptService from '../services/exportReceiptService.js'

const getAllExportReceipt = async (req: Request, res: Response) => {
  try {
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 5;
    const data = await ExportReceiptService.getAllExportReceipt(page, limit);
    res.json(data);
  } catch (error) {
    console.error('Controller error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

export {
  getAllExportReceipt
}
