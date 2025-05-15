import { Request, Response } from "express";
import * as CategoryService from '../services/categoryService.js';

const getAllCategory = async (req: Request, res: Response) => {
  try {
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 5;
    const data = await CategoryService.getAllCategory(page, limit);
    res.json(data);
  } catch (error) {
    console.error('Controller error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

const getCategoriesForSelectBox = async (req: Request, res: Response) => {
  try {
    const data = await CategoryService.getCategoriesForSelectBox();
    res.json(data);
  } catch (error) {
    console.error(`Controller error: ${error}`);
    res.status(500).json({ message: 'Server error' });
  }
};

export {
  getCategoriesForSelectBox, getAllCategory
};
