import { NguoiDungService } from "../services/nguoiDungService.js";

export class NguoiDungController {
  private nguoiDungService: NguoiDungService;

  constructor() {
    this.nguoiDungService = new NguoiDungService();
  }

  public getAllCustomer = async (req: any, res: any) => {
    try {
      const page = parseInt(req.query.page as string) || 1;
      const limit = parseInt(req.query.limit as string) || 5;
      const customerId = req.query.search as string || '';
      const rawStatus = req.query.status as string;
      const status = rawStatus === 'undefined' ? '' : rawStatus.split(',').map(s => `'${s}'`).join(',');
      const data = await this.nguoiDungService.getAllCustomer(page, limit, customerId, status);
      res.json(data);
    } catch (error) {
      console.error('Controller error:', error);
      res.status(500).json({ message: 'Server error' });
    }
  };

  public getAllStaff = async (req: any, res: any) => {
    try {
      const page = parseInt(req.query.page as string) || 1;
      const limit = parseInt(req.query.limit as string) || 5;
      const staffId = req.query.search as string || '';
      const rawStatus = req.query.status as string;
      const status = rawStatus === 'undefined' ? '' : rawStatus.split(',').map(s => `'${s}'`).join(',');
      const rawRoleId = req.query.roleId as string || '';
      const roleId = rawRoleId === 'undefined' ? '' : rawRoleId.split(',').map(s => `'${s}'`).join(',');
      const data = await this.nguoiDungService.getAllStaff(page, limit, staffId, status, roleId);
      res.json(data);
    } catch (error) {
      console.error('Controller error:', error);
      res.status(500).json({ message: 'Server error' });
    }
  };
}
