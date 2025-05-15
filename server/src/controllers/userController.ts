import { Request, Response } from "express";
import * as UserService from '../services/userService.js';

const getAllCustomer = async (req: Request, res: Response) => {
  try {
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 5;
    const data = await UserService.getAllCustomer(page, limit);
    res.json(data);
  } catch (error) {
    console.error('Controller error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

const getAllStaff = async (req: Request, res: Response) => {
  try {
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 5;
    const data = await UserService.getAllStaff(page, limit);
    res.json(data);
  } catch (error) {
    console.error('Controller error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

export {
  getAllCustomer, getAllStaff
};
