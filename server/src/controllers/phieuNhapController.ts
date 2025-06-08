import { Request, Response } from "express";
import { PhieuNhapService } from "../services/phieuNhapService.js";
import { PhieuNhap } from "../models/phieuNhapModel.js";

export class PhieuNhapController {
  private phieuNhapService: PhieuNhapService;

  constructor () {
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

  public getById = async (req: Request, res: Response) => {
    try {
      const importReceiptId = req.params.id as string || '';
      if (!importReceiptId) {
        res.status(404).json({ message: 'Id not found!' });
        return;
      }
      const result = await this.phieuNhapService.getById(importReceiptId);
      res.json(result);
    } catch (error) {
      console.error('Error controller:', error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  };

  public insert = async (req: Request, res: Response) => {
    try {
      const payload = req.body;
      if (!payload) {
        res.status(404).json({ message: 'Data not found!' });
        return;
      }
      const importReceipt = new PhieuNhap('', null, payload.ghiChu, '', 3, payload.maQuanTriVien, null, null, payload.maNhaCungCap);
      const result = await this.phieuNhapService.insert(importReceipt);
      res.status(201).json(result);
    } catch (error) {
      console.error('Error controller:', error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  };

  public update = async (req: Request, res: Response) => {
    try {
      const payload = req.body;
      const importReceiptId = req.params.id;
      if (!payload || !importReceiptId) {
        res.status(404).json({ message: 'Data not found!' });
        return;
      }
      const importReceipt = new PhieuNhap(importReceiptId, null, payload.ghiChu, '', 0, payload.maQuanTriVien, null, null, payload.maNhaCungCap);
      const result = await this.phieuNhapService.update(importReceipt);
      res.json(result);
    } catch (error) {
      console.error('Error controller:', error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  };

  public softDelete = async (req: Request, res: Response) => {
    try {
      const importReceiptId = req.params.id;
      const { adminId } = req.body;
      if (!importReceiptId || !adminId) {
        res.status(404).json({ message: 'Data not found!' });
        return;
      }
      const result = await this.phieuNhapService.softDelete(importReceiptId, adminId);
      res.json(result);
    } catch (error) {
      console.error('Error controller:', error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  };

  public approveImportReceipt = async (req: Request, res: Response) => {
    try {
      const importReceiptId = req.params.id;
      const { adminId } = req.body;
      if (!importReceiptId || !adminId) {
        res.status(404).json({ message: 'Data not found!' });
        return;
      }
      const result = await this.phieuNhapService.approveImportReceipt(importReceiptId, adminId);
      res.json(result);
    } catch (error) {
      console.error('Error controller:', error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  };
}
