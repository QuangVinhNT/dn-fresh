import { Request, Response, Router } from "express";
import { GioHangController } from "../controllers/gioHangController.js";
import { authMiddleware } from "../middlewares/authMiddleware.js";
import { checkRole } from "../middlewares/checkRoleMiddleware.js";

const gioHangRoutes = Router();
const gioHangController = new GioHangController();

gioHangRoutes.get('/:id', authMiddleware, checkRole(['VT004']), (req: Request, res: Response) => {
  const role = req.user?.roleId;
  if (role === 'VT004') return gioHangController.getAll(req, res);
})

gioHangRoutes.post('/:id', authMiddleware, checkRole(['VT004']), (req: Request, res: Response) => {
  const role = req.user?.roleId;
  if (role === 'VT004') return gioHangController.insert(req, res);
})

gioHangRoutes.put('/:id', authMiddleware, checkRole(['VT004']), (req: Request, res: Response) => {
  const role = req.user?.roleId;
  if (role === 'VT004') return gioHangController.update(req, res);
})

gioHangRoutes.delete('/:id', authMiddleware, checkRole(['VT004']), (req: Request, res: Response) => {
  const role = req.user?.roleId;
  if (role === 'VT004') return gioHangController.delete(req, res);
})
