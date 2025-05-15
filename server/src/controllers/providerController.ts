import { Request, Response } from "express";
import * as ProviderService from '../services/providerService.js'

const getAllProviderName = async (req: Request, res: Response) => {
  try {
    const data = await ProviderService.getAllProviderName();
    res.json(data);
  } catch (error) {
    console.error('Controller error:', error);
    res.status(500).json({message: 'Server error'});
  }
}

export {
  getAllProviderName
}
