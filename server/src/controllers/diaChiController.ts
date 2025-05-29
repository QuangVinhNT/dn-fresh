import { Request, Response } from "express";
import { DiaChiService } from "../services/diaChiService.js";

export class DiaChiController {
  private diaChiService: DiaChiService;

  constructor () {
    this.diaChiService = new DiaChiService();
  }

  public getAllCity = async (req: Request, res: Response) => {
    try {      
      const data = await this.diaChiService.getAllCity();
      res.json(data);
    } catch (error) {
      console.error('Controller error:', error);
      res.status(500).json({ message: 'Server error' });
    }
  }

  public getAllCommuneByCityId = async (req: Request, res: Response) => {
    try {      
      const cityId = req.query.cityId as string || ''
      const data = await this.diaChiService.getAllCommuneByCityId(cityId);
      res.json(data);
    } catch (error) {
      console.error('Controller error:', error);
      res.status(500).json({ message: 'Server error' });
    }
  }
}
