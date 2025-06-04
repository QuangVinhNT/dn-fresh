import { Request, Response } from "express";
import { VaiTroNguoiDungService } from "../services/vaiTroNguoiDungService.js";
import { VaiTroNguoiDung } from "../models/vaiTroNguoiDungModel.js";
import { pool } from "../configs/database.js";

export class VaiTroNguoiDungController {
  private vaiTroNguoiDungService: VaiTroNguoiDungService;

  constructor () {
    this.vaiTroNguoiDungService = new VaiTroNguoiDungService();
  }

  public insertUserRole = async (req: Request, res: Response) => {
    const connection = await pool.getConnection();
    try {
      const payload = req.body;
      if (!payload) {
        res.status(404).json({ message: 'Data not found!' });
        return;
      }
      const userRole = new VaiTroNguoiDung(payload.maNguoiDung, payload.maVaiTro);
      connection.beginTransaction();
      const result = await this.vaiTroNguoiDungService.insertUserRole(userRole, connection);
      connection.commit();
      res.status(201).json(result);
    } catch (error) {
      connection.rollback();
      console.error('Controller error:', error);
      res.status(500).json({ message: 'Server error' });
    } finally {
      connection.release();
    }
  };

  public deleteAllStaffRole = async (req: Request, res: Response) => {
    try {
      const userId = req.params.id as string || '';
      if (!userId) {
        res.status(404).json({ message: 'Data not found!' });
        return;
      }
      const result = await this.vaiTroNguoiDungService.deleteAllStaffRole(userId);
      res.json(result);
    } catch (error) {
      console.error('Controller error:', error);
      res.status(500).json({ message: 'Server error' });
    }
  };

  public updateRole = async (req: Request, res: Response) => {
    try {
      const userId = req.params.id as string || '';
      const payload = req.body;
      if (!userId || !payload) {
        res.status(404).json({ message: 'Data not found!' });
        return;
      }
      const userRole = new VaiTroNguoiDung(userId, payload.maVaiTro);
      const result = await this.vaiTroNguoiDungService.updateRole(userRole);
      res.json(result);
    } catch (error) {
      console.error('Controller error:', error);
      res.status(500).json({ message: 'Server error' });
    }
  };
}
