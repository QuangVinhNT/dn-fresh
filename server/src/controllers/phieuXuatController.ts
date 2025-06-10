import { Request, Response } from "express";
import { PhieuXuatService } from "../services/phieuXuatService.js";
import { PhieuXuat } from "../models/phieuXuatModel.js";

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

  public getById = async (req: Request, res: Response) => {
    try {
      const exportReceiptId = req.params.id as string || '';
      if (!exportReceiptId) {
        res.status(404).json({ message: 'Id not found!' });
        return;
      }
      const result = await this.phieuXuatService.getById(exportReceiptId);
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
      const exportReceipt = new PhieuXuat('', null, payload.ghiChu, '', 3, payload.maQuanTriVien, null, null);
      const result = await this.phieuXuatService.insert(exportReceipt);
      res.status(201).json(result);
    } catch (error) {
      console.error('Error controller:', error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  };

  public update = async (req: Request, res: Response) => {
    try {
      const payload = req.body;
      const exportReceiptId = req.params.id;
      if (!payload || !exportReceiptId) {
        res.status(404).json({ message: 'Data not found!' });
        return;
      }
      const exportReceipt = new PhieuXuat(exportReceiptId, null, payload.ghiChu, '', 0, payload.maQuanTriVien, null, null);
      const result = await this.phieuXuatService.update(exportReceipt);
      res.json(result);
    } catch (error) {
      console.error('Error controller:', error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  };

  public softDelete = async (req: Request, res: Response) => {
    try {
      const exportReceiptId = req.params.id;
      const { adminId } = req.body;
      if (!exportReceiptId || !adminId) {
        res.status(404).json({ message: 'Data not found!' });
        return;
      }
      const result = await this.phieuXuatService.softDelete(exportReceiptId, adminId);
      res.json(result);
    } catch (error) {
      console.error('Error controller:', error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  };

  public approveExportReceipt = async (req: Request, res: Response) => {
    try {
      const exportReceiptId = req.params.id;
      const { adminId } = req.body;
      if (!exportReceiptId || !adminId) {
        res.status(404).json({ message: 'Data not found!' });
        return;
      }
      const result = await this.phieuXuatService.approveExportReceipt(exportReceiptId, adminId);
      res.json(result);
    } catch (error) {
      console.error('Error controller:', error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  };

  public getAllForStaff = async (req: Request, res: Response) => {
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 5;
    const exportReceiptId = req.query.search as string || '';
    const rawStatus = req.query.status as string || '';
    const status = rawStatus === 'undefined' ? '' : rawStatus.split(',').map(s => `'${s}'`).join(',');
    try {
      const data = await this.phieuXuatService.getAllForStaff(page, limit, exportReceiptId, status);
      res.json(data);
    } catch (error) {
      console.error(`Controller error: ${error}`);
      res.status(500).json({ message: 'Server error' });
    }
  };

  public requestApproveExportReceipt = async (req: Request, res: Response) => {
    try {
      const exportReceiptId = req.params.id;
      const { staffId } = req.body;
      if (!exportReceiptId || !staffId) {
        res.status(404).json({ message: 'Data not found!' });
        return;
      }
      const result = await this.phieuXuatService.requestApproveExportReceipt(exportReceiptId, staffId);
      res.json(result);
    } catch (error) {
      console.error('Error controller:', error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  };
}
