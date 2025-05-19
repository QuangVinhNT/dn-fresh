import { Request, Response } from "express";
import * as OrderService from '../services/orderService.js'

const getAllAdminOrder = async (req: Request, res: Response) => {
  try {
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 5;
    const data = await OrderService.getAllAdminOrder(page, limit);
    res.json(data);
  } catch (error) {
    console.error('Controller error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

export {
  getAllAdminOrder
}
