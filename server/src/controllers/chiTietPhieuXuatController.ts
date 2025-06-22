import { Request, Response } from "express";
import { ChiTietPhieuXuatService } from "../services/chiTietPhieuXuatService.js";
import { ChiTietPhieuXuat } from "../models/chiTietPhieuXuatModel.js";

export class ChiTietPhieuXuatController {
  private chiTietPhieuXuatService: ChiTietPhieuXuatService;

  constructor () {
    this.chiTietPhieuXuatService = new ChiTietPhieuXuatService();
  }

  public insert = async (req: Request, res: Response) => {
    try {
      const exportReceiptId = req.params.id;
      const payload = req.body;
      if (!payload || !exportReceiptId) {
        res.status(404).json({ message: 'Data not found!' });
        return;
      }
      const exportReceiptDetail = new ChiTietPhieuXuat(exportReceiptId, payload.maThucPham, payload.maLoHang, payload.soLuong);
      const result = await this.chiTietPhieuXuatService.insert(exportReceiptDetail);
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
      const exportReceiptDetail = new ChiTietPhieuXuat(exportReceiptId, payload.maSanPham, payload.maLoHang, payload.soLuong);
      const result = await this.chiTietPhieuXuatService.update(exportReceiptDetail);
      res.json(result);
    } catch (error) {
      console.error('Error controller:', error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  };

  public delete = async (req: Request, res: Response) => {
    try {
      const exportReceiptId = req.params.id;
      if (!exportReceiptId) {
        res.status(404).json({ message: 'Data not found!' });
        return;
      }
      const result = await this.chiTietPhieuXuatService.delete(exportReceiptId);
      res.json(result);
    } catch (error) {
      console.error('Error controller:', error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  };
}
