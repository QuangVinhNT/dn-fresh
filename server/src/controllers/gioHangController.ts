import { Request, Response } from "express";
import { GioHangService } from "../services/gioHangService.js";
import { GioHang } from "../models/gioHangModel.js";

export class GioHangController {
  private gioHangService: GioHangService;

  constructor () {
    this.gioHangService = new GioHangService();
  }

  public getAll = async (req: Request, res: Response) => {
    try {
      const userId = req.params.id;
      if (!userId) {
        res.status(400).json({ message: 'Data not found!' });
        return;
      }
      const result = await this.gioHangService.getAll(userId);
      res.json(result);
    } catch (error) {
      console.error('Controller error:', error);
      throw error;
    }
  };

  public insert = async (req: Request, res: Response) => {
    try {
      const userId = req.params.id;
      const payload = req.body;
      if (!userId || !payload) {
        res.status(400).json({ message: 'Data not found!' });
        return;
      }
      const gioHang = new GioHang(payload.maThucPham, userId, payload.soLuong);
      const result = await this.gioHangService.insert(gioHang);
      res.json(result);
    } catch (error) {
      console.error('Controller error:', error);
      throw error;
    }
  };

  public update = async (req: Request, res: Response) => {
    try {
      const userId = req.params.id;
      const payload = req.body;
      if (!userId || !payload) {
        res.status(400).json({ message: 'Data not found!' });
        return;
      }
      const gioHang = new GioHang(payload.maThucPham, userId, payload.soLuong);
      const result = await this.gioHangService.update(gioHang);
      res.json(result);
    } catch (error) {
      console.error('Controller error:', error);
      throw error;
    }
  };

  public delete = async (req: Request, res: Response) => {
    try {
      const userId = req.params.id;
      const payload = req.body;
      if (!userId || !payload) {
        res.status(400).json({ message: 'Data not found!' });
        return;
      }
      const gioHang = new GioHang(payload.maThucPham, userId, 0);
      const result = await this.gioHangService.delete(gioHang);
      res.json(result);
    } catch (error) {
      console.error('Controller error:', error);
      throw error;
    }
  };
}
