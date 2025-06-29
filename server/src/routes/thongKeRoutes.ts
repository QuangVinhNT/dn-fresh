import { Request, Response, Router } from "express";
import { ThongKeController } from "../controllers/thongKeController.js";
import { authMiddleware } from "../middlewares/authMiddleware.js";
import { checkRole } from "../middlewares/checkRoleMiddleware.js";

const thongKeRoutes = Router();
const thongKeController = new ThongKeController();

thongKeRoutes.get('/loi-nhuan', authMiddleware, checkRole(['VT001']), (req: Request, res: Response) => {
  const role = req.user?.roleId;
  if (role === 'VT001') return thongKeController.getProfit(req, res);
});

thongKeRoutes.get('/sap-het-han', authMiddleware, checkRole(['VT001']), (req: Request, res: Response) => {
  const role = req.user?.roleId;
  if (role === 'VT001') return thongKeController.getProductIsAboutToExpire(req, res);
});

thongKeRoutes.get('/het-han', authMiddleware, checkRole(['VT001']), (req: Request, res: Response) => {
  const role = req.user?.roleId;
  if (role === 'VT001') return thongKeController.getProductHasExpired(req, res);
});

thongKeRoutes.get('/sap-het-hang', authMiddleware, checkRole(['VT001']), (req: Request, res: Response) => {
  const role = req.user?.roleId;
  if (role === 'VT001') return thongKeController.getProductAlmostOutOfStock(req, res);
});

thongKeRoutes.get('/het-hang', authMiddleware, checkRole(['VT001']), (req: Request, res: Response) => {
  const role = req.user?.roleId;
  if (role === 'VT001') return thongKeController.getProductOutOfStock(req, res);
});

thongKeRoutes.get('/don-hang/doi-xu-ly', authMiddleware, checkRole(['VT001']), (req: Request, res: Response) => {
  const role = req.user?.roleId;
  if (role === 'VT001') return thongKeController.getOrderQuantityWaitingProcess(req, res);
});

thongKeRoutes.get('/doanh-thu-theo-thang', authMiddleware, checkRole(['VT001']), (req: Request, res: Response) => {
  const role = req.user?.roleId;
  if (role === 'VT001') return thongKeController.getRevenueByMonth(req, res);
});

thongKeRoutes.get('/don-hang-theo-thang', authMiddleware, checkRole(['VT001']), (req: Request, res: Response) => {
  const role = req.user?.roleId;
  if (role === 'VT001') return thongKeController.getOrderQuantityByMonth(req, res);
});

thongKeRoutes.get('/don-hang-theo-trang-thai', authMiddleware, checkRole(['VT001']), (req: Request, res: Response) => {
  const role = req.user?.roleId;
  if (role === 'VT001') return thongKeController.getOrderQuantityByStatus(req, res);
});

export default thongKeRoutes;
