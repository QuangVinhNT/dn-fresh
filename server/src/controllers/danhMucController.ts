import { Request, Response } from "express";
import { DanhMucService } from "../services/danhMucService.js";

export class DanhMucController {
  private danhMucService: DanhMucService;

  constructor() {
    this.danhMucService = new DanhMucService();
  }

  public getAllForFilter = async (req: Request, res: Response) => {
    try {
      const data = await this.danhMucService.getAllForFilter();
      res.json(data);
    } catch (error) {
      console.error(`Controller error: ${error}`);
      res.status(500).json({ message: 'Server error' });
    }
  };
}
