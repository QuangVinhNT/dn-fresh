import { Request, Response } from "express";
import * as FavouriteProductService from '../services/favouriteProductService.js'

const getAllFavouriteProduct = async (req: Request, res: Response) => {
  try {
      const page = parseInt(req.query.page as string) || 1;
      const limit = parseInt(req.query.limit as string) || 5;
      const userId = req.query.userid as string || '';
      const data = await FavouriteProductService.getAllFavouriteProduct(page, limit, userId);
      res.json(data);
    } catch (error) {
      console.error('Controller error:', error);
      res.status(500).json({ message: 'Server error' });
    }
}

const insertFavouriteProduct = async (req: Request, res: Response) => {
  try {
    const { productId, userId } = req.body;
    const result = await FavouriteProductService.insertFavouriteProduct(productId, userId);
    res.status(201).json({
      success: true,
      message: 'Create favourite product success',
      info: result,
    });
  } catch (error) {
    console.error('Controller error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

const deleteFavouriteProduct = async (req: Request, res: Response) => {
  try {
    const { productId, userId } = req.query;
    console.log('ProductId:', productId)
    console.log('UserId:', userId)
    const result = await FavouriteProductService.deleteFavouriteProduct(userId as string, productId as string);
    res.status(200).json({
      success: true,
      message: 'Delete favourite product success',
      info: result,
    });
  } catch (error) {
    console.error('Controller error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

export {
  getAllFavouriteProduct, insertFavouriteProduct, deleteFavouriteProduct
}
