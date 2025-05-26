import { Request, Response } from "express";
import * as ProductService from '../services/productService.js';

const getAllAdminProduct = async (req: Request, res: Response) => {
  try {
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 5;
    const data = await ProductService.getAllAdminProduct(page, limit);
    res.json(data);
  } catch (error) {
    console.error('Controller error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

const getAllProduct = async (req: Request, res: Response) => {
  try {
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 5;
    const categoryId = req.query.cateid as string || '';
    const orderBy = {
      name: req.query.sortColumn as string || '',
      value: req.query.sortDirection as string || ''
    };
    const name = req.query.search as string || '';
    const data = await ProductService.getAllProduct(page, limit, categoryId, orderBy, name);
    res.json(data);
  } catch (error) {
    console.error('Controller error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

const getAdminProductById = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    if (id) {
      const product = await ProductService.getAdminProductById(id);
      if (!product.id) {
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

const getProductById = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    if (id) {
      const product = await ProductService.getProductById(id);
      if (!product.id) {
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

const insertProduct = async (req: Request, res: Response) => {
  try {
    const { name, price, unit, description, categoryId, imageUrls } = req.body;
    const result = await ProductService.insertProduct(name, price, unit, description, categoryId, imageUrls);
    res.status(201).json({
      success: true,
      message: 'Create product success',
      info: result,
    });
  } catch (error) {
    console.error('Controller error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

const getAllDiscountProduct = async (req: Request, res: Response) => {
  try {
    const data = await ProductService.getAllDiscountProduct();
    res.json(data);
  } catch (error) {
    console.error('Controller error:', error);
    res.status(500).json({ message: 'Server error' });
  }
}

export {
  getAllAdminProduct, getAdminProductById, insertProduct, getAllProduct, getProductById, getAllDiscountProduct
};
