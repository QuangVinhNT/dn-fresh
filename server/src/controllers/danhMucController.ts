import { Request, Response } from "express";
import { DanhMucService } from "../services/danhMucService.js";
import { DanhMuc } from "../models/danhMucModel.js";

export class DanhMucController {
  private danhMucService: DanhMucService;

  constructor () {
    this.danhMucService = new DanhMucService();
  }

  public getAll = async (req: Request, res: Response) => {
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 10;
    const categoryName = req.query.search as string || '';
    const rawStatus = req.query.status as string || '';
    const status = rawStatus === 'undefined' ? '' : rawStatus.split(',').map(s => `'${s}'`).join(',');
    try {
      const data = await this.danhMucService.getAll(page, limit, categoryName, status);
      res.json(data);
    } catch (error) {
      console.error(`Controller error: ${error}`);
      res.status(500).json({ message: 'Server error' });
    }
  };

  public getAllForFilter = async (req: Request, res: Response) => {
    try {
      const data = await this.danhMucService.getAllForFilter();
      res.json(data);
    } catch (error) {
      console.error(`Controller error: ${error}`);
      res.status(500).json({ message: 'Server error' });
    }
  };

  public getAllForSelectBox = async (req: Request, res: Response) => {
    try {
      const data = await this.danhMucService.getAllForSelectBox();
      res.json(data);
    } catch (error) {
      console.error(`Controller error: ${error}`);
      res.status(500).json({ message: 'Server error' });
    }
  };

  public getById = async (req: Request, res: Response) => {
    try {
      const categoryId = req.params.id;
      const data = await this.danhMucService.getById(categoryId);
      res.json(data);
    } catch (error) {
      console.error(`Controller error: ${error}`);
      res.status(500).json({ message: 'Server error' });
    }
  };

  public insertCategory = async (req: Request, res: Response) => {
    try {
      const payload = req.body;
      if (!payload) {
        res.status(400).json({ message: 'Invalid category data' });
        return;
      }
      const category = new DanhMuc('', payload.tenDanhMuc, payload.moTa, payload.trangThai, null, null);
      const result = await this.danhMucService.insertCategory(category);
      res.status(201).json(result);
    } catch (error) {
      console.error(`Controller error: ${error}`);
      res.status(500).json({ message: 'Server error' });
    }
  };

  public updateCategory = async (req: Request, res: Response) => {
    try {
      const categoryId = req.params.id;
      const payload = req.body;
      if (!payload || !categoryId) {
        res.status(400).json({ message: 'Invalid category data' });
        return;
      }
      const category = new DanhMuc(categoryId, payload.tenDanhMuc, payload.moTa, payload.trangThai, null, null);
      const result = await this.danhMucService.updateCategory(category);
      res.json(result);
    } catch (error) {
      console.error(`Controller error: ${error}`);
      res.status(500).json({ message: 'Server error' });
    }
  };

  public deleteCategory = async (req: Request, res: Response) => {
    try {
      const categoryId = req.params.id;
      if (!categoryId) {
        res.status(400).json({ message: 'Invalid category id' });
        return;
      }
      const result = await this.danhMucService.deleteCategory(categoryId);
      res.json(result);
    } catch (error) {
      console.error(`Controller error: ${error}`);
      res.status(500).json({ message: 'Server error' });
    }
  };
}
