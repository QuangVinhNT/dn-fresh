import { Request, Response } from "express";
import { DonHangService } from "../services/donHangService.js";
import { DonHang } from "../models/donHangModel.js";
import { ChiTietDonHang } from "../models/chiTietDonHangModel.js";
import { DiaChi } from "../models/diaChiModel.js";

export class DonHangController {
  private donHangService: DonHangService;

  constructor () {
    this.donHangService = new DonHangService();
  }

  public getAll = async (req: Request, res: Response) => {
    try {
      const page = parseInt(req.query.page as string) || 1;
      const limit = parseInt(req.query.limit as string) || 5;
      const userId = req.query.userId as string || '';
      const orderId = req.query.search as string || '';
      const data = await this.donHangService.getAll(page, limit, userId, orderId);
      res.json(data);
    } catch (error) {
      console.error('Controller error:', error);
      res.status(500).json({ message: 'Server error' });
    }
  };

  public getById = async (req: Request, res: Response) => {
    try {
      const orderId = req.params.id as string || '';
      const data = await this.donHangService.getById(orderId);
      res.json(data);
    } catch (error) {
      console.error('Controller error:', error);
      res.status(500).json({ message: 'Server error' });
    }
  };

  public getAllForAdmin = async (req: Request, res: Response) => {
    try {
      const page = parseInt(req.query.page as string) || 1;
      const limit = parseInt(req.query.limit as string) || 5;
      const orderId = req.query.search as string || '';
      const rawStatus = req.query.status as string || '';
      const status = rawStatus === 'undefined' ? '' : rawStatus.split(',').map(s => `'${s}'`).join(',');
      const data = await this.donHangService.getAllForAdmin(page, limit, orderId, status);
      res.json(data);
    } catch (error) {
      console.error('Controller error:', error);
      res.status(500).json({ message: 'Server error' });
    }
  };

  public getAllForDeliveryStaff = async (req: Request, res: Response) => {
    try {
      const page = parseInt(req.query.page as string) || 1;
      const limit = parseInt(req.query.limit as string) || 5;
      const orderId = req.query.search as string || '';
      const rawStatus = req.query.status as string || '';
      const status = rawStatus === 'undefined' ? '' : rawStatus.split(',').map(s => `'${s}'`).join(',');
      const communeId = req.query.communeId as string || '';
      const data = await this.donHangService.getAllForDeliveryStaff(page, limit, orderId, status, communeId);
      res.json(data);
    } catch (error) {
      console.error('Controller error:', error);
      res.status(500).json({ message: 'Server error' });
    }
  };

  public getAllOrderForInventoryStaff = async (req: Request, res: Response) => {
    try {
      const data = await this.donHangService.getAllOrderForInventoryStaff();
      res.json(data);
    } catch (error) {
      console.error('Controller error:', error);
      res.status(500).json({ message: 'Server error' });
    }
  };

  public insertOrder = async (req: Request, res: Response) => {
    try {
      const payload = req.body;
      if (!payload) {
        res.status(400).json({ message: 'Invalid order data' });
        return;
      }
      const order = new DonHang('', payload.maKhachHang, '', '', '', 1, null, null, payload.ghiChu, payload.phuongThucThanhToan, payload.giaTriDonHang);
      const orderDetails = payload.chiTietDonHang.map((item: { maThucPham: string; soLuong: number; }) => new ChiTietDonHang('', item.maThucPham, item.soLuong));
      const address = new DiaChi('', payload.chiTietDiaChi.trim(), payload.maPhuongXa);
      const result = await this.donHangService.insertOrder(order, orderDetails, address);
      res.status(201).json(result);
    } catch (error) {
      console.error('Controller error:', error);
      res.status(500).json({ message: 'Server error' });
    }
  };

  public getByIdForAdmin = async (req: Request, res: Response) => {
    try {
      const orderId = req.params.id as string || '';
      const data = await this.donHangService.getByIdForAdmin(orderId);
      res.json(data);
    } catch (error) {
      console.error('Controller error:', error);
      res.status(500).json({ message: 'Server error' });
    }
  };

  public unpackOrdersByExportReceipt = async (req: Request, res: Response) => {
    try {
      const exportReceiptId = req.params.id as string || '';
      if (!exportReceiptId) {
        res.status(400).json({ message: 'Export receipt ID is required' });
        return;
      }
      const result = await this.donHangService.unpackOrdersByExportReceipt(exportReceiptId);
      res.json(result);
    } catch (error) {
      console.error('Controller error:', error);
      res.status(500).json({ message: 'Server error' });
    }
  };

  public confirmPack = async (req: Request, res: Response) => {
    try {
      const orderId = req.params.id as string || '';
      const payload = req.body;
      if (!orderId || !payload) {
        res.status(400).json({ message: 'Order ID is required' });
        return;
      }
      const result = await this.donHangService.confirmPack(orderId, payload.maPhieuXuat);
      res.json(result);
    } catch (error) {
      console.error('Controller error:', error);
      res.status(500).json({ message: 'Server error' });
    }
  };

  public confirmExport = async (req: Request, res: Response) => {
    try {
      const orderId = req.params.id as string || '';
      const payload = req.body;
      if (!payload || !orderId) {
        res.status(400).json({ message: 'Data not found!' });
        return;
      }
      const result = await this.donHangService.confirmExport(orderId, payload.staffId);
      res.json(result);
    } catch (error) {
      console.error('Controller error:', error);
      res.status(500).json({ message: 'Server error' });
    }
  };

  public confirmFinish = async (req: Request, res: Response) => {
    try {
      const orderId = req.params.id as string || '';
      const payload = req.body;
      if (!payload || !orderId) {
        res.status(400).json({ message: 'Data not found!' });
        return;
      }
      const result = await this.donHangService.confirmFinish(orderId, payload.staffId);
      res.json(result);
    } catch (error) {
      console.error('Controller error:', error);
      res.status(500).json({ message: 'Server error' });
    }
  };

  public cancelOrder = async (req: Request, res: Response) => {
    try {
      const orderId = req.params.id as string || '';
      const { staffId, note } = req.body;
      if (!orderId || !note) {
        res.status(400).json({ message: 'Data not found!' });
        return;
      }
      const result = await this.donHangService.cancelOrder(orderId, staffId, note);
      res.json(result);
    } catch (error) {
      console.error('Controller error:', error);
      res.status(500).json({ message: 'Server error' });
    }
  };
}
