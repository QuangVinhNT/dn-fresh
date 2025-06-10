import { Request, Response } from "express";
import { ChiTietThucPhamNhapService } from "../services/chiTietThucPhamNhapService.js";
import { ChiTietThucPhamNhap } from "../models/chiTietThucPhamNhapModel.js";

export class ChiTietThucPhamNhapController {
  private chiTietThucPhamNhapService: ChiTietThucPhamNhapService;

  constructor () {
    this.chiTietThucPhamNhapService = new ChiTietThucPhamNhapService();
  }

  public insert = async (req: Request, res: Response) => {
    try {
      const importReceiptId = req.params.id;
      const payload = req.body;
      if (!payload || !importReceiptId) {
        res.status(404).json({ message: 'Data not found!' });
        return;
      }
      const product = new ChiTietThucPhamNhap(
        '',
        payload.maThucPham,
        importReceiptId,
        new Date(payload.ngaySanXuat),
        new Date(payload.hanSuDung),
        payload.donGiaNhap,
        payload.soLuong
      );
      const result = await this.chiTietThucPhamNhapService.insert(product);
      res.status(201).json(result);
    } catch (error) {
      console.error('Error controller:', error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  };

  public update = async (req: Request, res: Response) => {
    try {
      const productPackageId = req.params.id;
      const payload = req.body;
      if (!payload || !productPackageId) {
        res.status(404).json({ message: 'Data not found!' });
        return;
      }
      const product = new ChiTietThucPhamNhap(
        productPackageId,
        payload.maThucPham,
        payload.maPhieuNhap,
        new Date(payload.ngaySanXuat),
        new Date(payload.hanSuDung),
        payload.donGiaNhap,
        payload.soLuong
      );
      const result = await this.chiTietThucPhamNhapService.update(product);
      res.status(200).json(result);
    } catch (error) {
      console.error('Error controller:', error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  };

  public delete = async (req: Request, res: Response) => {
    try {
      const productPackageId = req.params.id;
      if (!productPackageId) {
        res.status(404).json({ message: 'Data not found!' });
        return;
      }
      const result = await this.chiTietThucPhamNhapService.delete(productPackageId);
      res.status(200).json(result);
    } catch (error) {
      console.error('Error controller:', error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  };
}
