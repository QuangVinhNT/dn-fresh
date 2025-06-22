import { Request, Response, Router } from "express";
import { DonHangController } from "../controllers/donHangController.js";
import { authMiddleware } from "../middlewares/authMiddleware.js";
import { checkRole } from "../middlewares/checkRoleMiddleware.js";

const donHangRoutes = Router();
const donHangController = new DonHangController();

donHangRoutes.get('/', authMiddleware, checkRole(['VT001', 'VT003', 'VT004']), (req: Request, res: Response) => {
  const role = req.user?.roleId;
  if (role === 'VT001') return donHangController.getAllForAdmin(req, res);
  if (role === 'VT003') return donHangController.getAllForDeliveryStaff(req, res);
  if (role === 'VT004') return donHangController.getAll(req, res);
});

donHangRoutes.get('/ready', authMiddleware, checkRole(['VT002']), (req: Request, res: Response) => {
  const role = req.user?.roleId;
  if (role === 'VT002') return donHangController.getAllOrderForInventoryStaff(req, res);
});

donHangRoutes.get('/:id', authMiddleware, checkRole(['VT001', 'VT003', 'VT004']), (req: Request, res: Response) => {
  const role = req.user?.roleId;
  if (role === 'VT004' || role === 'VT003') return donHangController.getById(req, res);
  if (role === 'VT001') return donHangController.getByIdForAdmin(req, res);
});

donHangRoutes.post('/', authMiddleware, checkRole(['VT004']), (req: Request, res: Response) => {
  const role = req.user?.roleId;
  if (role === 'VT004') return donHangController.insertOrder(req, res);
});

donHangRoutes.patch('/:id/pack', authMiddleware, checkRole(['VT002']), (req: Request, res: Response) => {
  const role = req.user?.roleId;
  if (role === 'VT002') return donHangController.confirmPack(req, res);
});

donHangRoutes.patch('/:id/export', authMiddleware, checkRole(['VT003']), (req: Request, res: Response) => {
  const role = req.user?.roleId;
  if (role === 'VT003') return donHangController.confirmExport(req, res);
});

donHangRoutes.patch('/:id/finish', authMiddleware, checkRole(['VT003']), (req: Request, res: Response) => {
  const role = req.user?.roleId;
  if (role === 'VT003') return donHangController.confirmFinish(req, res);
});

donHangRoutes.patch('/:id/cancel', authMiddleware, checkRole(['VT003', 'VT004']), (req: Request, res: Response) => {
  const role = req.user?.roleId;
  if (role === 'VT003') return donHangController.cancelOrder(req, res);
});

export default donHangRoutes;
