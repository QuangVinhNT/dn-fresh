import { Request, Response } from "express";
import { NguoiDungService } from "../services/nguoiDungService.js";
import { NguoiDung } from "../models/nguoiDungModel.js";
import { DiaChi } from "../models/diaChiModel.js";

export class NguoiDungController {
  private nguoiDungService: NguoiDungService;

  constructor () {
    this.nguoiDungService = new NguoiDungService();
  }

  public getAllCustomer = async (req: Request, res: Response) => {
    try {
      const page = parseInt(req.query.page as string) || 1;
      const limit = parseInt(req.query.limit as string) || 5;
      const customerId = req.query.search as string || '';
      const rawStatus = req.query.status as string;
      const status = rawStatus === 'undefined' ? '' : rawStatus.split(',').map(s => `'${s}'`).join(',');
      const data = await this.nguoiDungService.getAllCustomer(page, limit, customerId, status);
      res.json(data);
    } catch (error) {
      console.error('Controller error:', error);
      res.status(500).json({ message: 'Server error' });
    }
  };

  public getAllStaff = async (req: Request, res: Response) => {
    try {
      const page = parseInt(req.query.page as string) || 1;
      const limit = parseInt(req.query.limit as string) || 5;
      const staffId = req.query.search as string || '';
      const rawStatus = req.query.status as string;
      const status = rawStatus === 'undefined' ? '' : rawStatus.split(',').map(s => `'${s}'`).join(',');
      const rawRoleId = req.query.roleId as string || '';
      const roleId = rawRoleId === 'undefined' ? '' : rawRoleId.split(',').map(s => `'${s}'`).join(',');
      const data = await this.nguoiDungService.getAllStaff(page, limit, staffId, status, roleId);
      res.json(data);
    } catch (error) {
      console.error('Controller error:', error);
      res.status(500).json({ message: 'Server error' });
    }
  };

  public getCustomerById = async (req: Request, res: Response) => {
    try {
      const customerId = req.params.id as string || '';
      if (!customerId) {
        res.status(404).json({ message: 'Customer not found!' });
        return;
      }
      const data = await this.nguoiDungService.getCustomerById(customerId);
      res.json(data);
    } catch (error) {
      console.error('Controller error:', error);
      res.status(500).json({ message: 'Server error' });
    }
  };

  public lockAccount = async (req: Request, res: Response) => {
    try {
      const userId = req.params.id as string || '';
      if (!userId) {
        res.status(404).json({ message: 'User not found!' });
        return;
      }
      const result = await this.nguoiDungService.lockAccount(userId);
      res.json(result);
    } catch (error) {
      console.error('Controller error:', error);
      res.status(500).json({ message: 'Server error' });
    }
  }

  public unlockAccount = async (req: Request, res: Response) => {
    try {
      const userId = req.params.id as string || '';
      if (!userId) {
        res.status(404).json({ message: 'User not found!' });
        return;
      }
      const result = await this.nguoiDungService.unlockAccount(userId);
      res.json(result);
    } catch (error) {
      console.error('Controller error:', error);
      res.status(500).json({ message: 'Server error' });
    }
  }

  // public insertCustomer = async (req: Request, res: Response) => {
  //   try {
  //     const payload = req.body;
  //     if (!payload) {
  //       res.status(400).json({ message: 'Invalid order data' });
  //       return;
  //     }
  //     const customer = new NguoiDung('', payload.hoTen, payload.gioiTinh, new Date(payload.ngaySinh), payload.soDienThoai, '', payload.email, '', payload.hinhAnh, null, null, 1);
  //     const address = new DiaChi('', payload.chiTietDiaChi, payload.maPhuongXa);
  //     const result = await this.nguoiDungService.insertCustomer(customer, address);
  //     res.status(201).json(result);
  //   } catch (error) {
  //     console.error('Controller error:', error);
  //     res.status(500).json({ message: 'Server error' });
  //   }
  // };
}
