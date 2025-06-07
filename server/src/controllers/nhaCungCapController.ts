import { Request, Response } from "express";
import { NhaCungCapService } from "../services/nhaCungCapService.js";
import { NhaCungCap } from "../models/nhaCungCapModel.js";
import { DiaChi } from "../models/diaChiModel.js";

export class NhaCungCapController {
  private nhaCungCapService: NhaCungCapService;

  constructor () {
    this.nhaCungCapService = new NhaCungCapService();
  }

  public getAll = async (req: Request, res: Response) => {
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
  };

  public insertProvider = async (req: Request, res: Response) => {
    try {
      const payload = req.body;
      if (!payload) {
        res.status(400).json({ message: 'Invalid provider data' });
        return;
      }
      const provider = new NhaCungCap('', payload.tenNhaCungCap, payload.moTa, new Date(payload.ngayThanhLap), null, '', payload.trangThaiHoatDong, payload.giayToPhapLy, null);
      const address = new DiaChi('', payload.chiTietDiaChi, payload.maPhuongXa);
      const result = await this.nhaCungCapService.insertProvider(provider, address);
      res.status(201).json(result);
    } catch (error) {
      console.error('Controller error:', error);
      res.status(500).json({ message: 'Server error' });
    }
  };

  public getById = async (req: Request, res: Response) => {
    try {
      const providerId = req.params.id;
      if (!providerId) {
        res.status(400).json({ message: 'Invalid id' });
        return;
      }
      const result = await this.nhaCungCapService.getById(providerId);
      res.json(result);
    } catch (error) {
      console.error('Controller error:', error);
      res.status(500).json({ message: 'Server error' });
    }
  };

  public deleteProvider = async (req: Request, res: Response) => {
    try {
      const providerId = req.params.id;
      if (!providerId) {
        res.status(400).json({ message: 'Invalid id' });
        return;
      }
      const result = await this.nhaCungCapService.deleteProvider(providerId);
      res.json(result);
    } catch (error) {
      console.error('Controller error:', error);
      res.status(500).json({ message: 'Server error' });
    }
  };

  public updateProvider = async (req: Request, res: Response) => {
    try {
      const providerId = req.params.id;
      const payload = req.body;
      if (!providerId || !payload) {
        res.status(400).json({ message: 'Invalid data' });
        return;
      }
      const provider = new NhaCungCap(providerId, payload.tenNhaCungCap, payload.moTa, new Date(payload.ngayThanhLap), null, '', payload.trangThaiHoatDong, payload.giayToPhapLy, null);
      const address = new DiaChi('', payload.chiTietDiaChi, payload.maPhuongXa);
      const result = await this.nhaCungCapService.updateProvider(provider, address);
      res.json(result);
    } catch (error) {
      console.error('Controller error:', error);
      res.status(500).json({ message: 'Server error' });
    }
  };
}
