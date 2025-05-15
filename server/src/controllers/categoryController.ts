import { Request, Response } from "express";
import * as CategoryService from '../services/categoryService.js';

const getCategoriesForSelectBox = async (req: Request, res: Response) => {
  try {
    const data = await CategoryService.getCategoriesForSelectBox();
    res.json(data)
  } catch (error) {
    console.error(`Controller error: ${error}`);
    res.status(500).json({message: 'Server error'});
  }
};

export {
  getCategoriesForSelectBox
}
