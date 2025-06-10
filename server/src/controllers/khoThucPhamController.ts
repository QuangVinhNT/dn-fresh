import { Request, Response } from "express";
import { KhoThucPhamService } from "../services/khoThucPhamService.js";
import { KhoThucPham } from "../models/khoThucPhamModel.js";
import generateUUID from "../utils/generateUUID.js";
import { AnhThucPham } from "../models/anhThucPhamModel.js";

export class KhoThucPhamController {
  private khoThucPhamService: KhoThucPhamService;

  constructor () {
    this.khoThucPhamService = new KhoThucPhamService();
  }

  public getAll = async (req: Request, res: Response) => {
    try {
      const page = parseInt(req.query.page as string) || 1;
      const limit = parseInt(req.query.limit as string) || 5;
      const categoryId = req.query.categoryId as string || '';
      const orderBy = {
        columnName: req.query.sortColumn as string || '',
        direction: req.query.sortDirection as string || ''
      };
      const productName = req.query.search as string || '';
      const data = await this.khoThucPhamService.getAll(page, limit, categoryId, orderBy, productName);
      res.json(data);
    } catch (error) {
      console.error('Controller error:', error);
      res.status(500).json({ message: 'Server error' });
    }
  };

  public getById = async (req: Request, res: Response) => {
    try {
      const productId = req.params.id;
      if (productId) {
        const product = await this.khoThucPhamService.getById(productId);
        if (!product) {
          res.status(404).json({ message: 'Product not found' });
          return;
        }
        res.json(product);
      } else {
        res.status(400).json({ message: 'Invalid ID' });
        return;
      }
    } catch (error) {
      console.error('Controller error:', error);
      res.status(500).json({ message: 'Server error' });
    }
  };

  public getAllDiscount = async (req: Request, res: Response) => {
    try {
      const data = await this.khoThucPhamService.getAllDiscount();
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
      const productName = req.query.search as string || '';
      const rawStatus = req.query.status as string;
      const status = rawStatus === 'undefined' ? '' : rawStatus.split(',').map(s => `'${s}'`).join(',');
      const rawCategory = req.query.category as string;
      const category = rawCategory === 'undefined' ? '' : rawCategory.split(',').map(s => `'${s}'`).join(',');
      const data = await this.khoThucPhamService.getAllForAdmin(page, limit, productName, status, category);
      res.json(data);
    } catch (error) {
      console.log(req.query.status)
      console.error('Controller error:', error);
      res.status(500).json({ message: 'Server error' });
    }
  };

  public getByIdForAdmin = async (req: Request, res: Response) => {
    try {
      const productId = req.params.id;
      if (productId) {
        const product = await this.khoThucPhamService.getByIdForAdmin(productId);
        if (!product) {
          res.status(404).json({ message: 'Product not found' });
          return;
        }
        res.json(product);
      } else {
        res.status(400).json({ message: 'Invalid ID' });
        return;
      }
    } catch (error) {
      console.error('Controller error:', error);
      res.status(500).json({ message: 'Server error' });
    }
  };

  public insertProduct = async (req: Request, res: Response) => {
    try {
      const payload = req.body;
      if (!payload) {
        res.status(400).json({ message: 'Invalid product data' });
        return;
      }
      const product = new KhoThucPham('', payload.tenThucPham, payload.donGia, payload.moTa, 2, payload.maDanhMuc, 0, new Date(), new Date(), 0, payload.donViTinh);
      const result = await this.khoThucPhamService.insertProduct(product, payload.hinhAnh);
      res.status(201).json(result);
    } catch (error) {
      console.error('Controller error:', error);
      res.status(500).json({ message: 'Server error' });
    }
  };

  public updateProduct = async (req: Request, res: Response) => {
    try {
      const productId = req.params.id;
      const payload = req.body;
      if (!payload || !productId) {
        res.status(400).json({ message: 'Invalid product data' });
        return;
      }
      const product = new KhoThucPham(productId, payload.tenThucPham, payload.donGia, payload.moTa, payload.trangThai, payload.maDanhMuc, 0, new Date(), new Date(), 0, payload.donViTinh);
      const result = await this.khoThucPhamService.updateProduct(product, payload.hinhAnh);
      res.json(result);
    } catch (error) {
      console.error('Controller error:', error);
      res.status(500).json({ message: 'Server error' });
    }
  };

  public deleteProduct = async (req: Request, res: Response) => {
    try {
      const productId = req.params.id;
      if (!productId) {
        res.status(400).json({ message: 'Invalid product ID' });
        return;
      }
      const result = await this.khoThucPhamService.deleteProduct(productId);
      res.json(result);
    } catch (error) {
      console.error('Controller error:', error);
      res.status(500).json({ message: 'Server error' });
    }
  };
}
