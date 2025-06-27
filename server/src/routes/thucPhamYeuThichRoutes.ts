import { Request, Response, Router } from "express";
import { ThucPhamYeuThichController } from "../controllers/thucPhamYeuThichController.js";
import { authMiddleware } from "../middlewares/authMiddleware.js";
import { checkRole } from "../middlewares/checkRoleMiddleware.js";

const thucPhamYeuThichRoutes = Router();
const thucPhamYeuThichController = new ThucPhamYeuThichController();

thucPhamYeuThichRoutes.get('/:id', authMiddleware, checkRole(['VT004']), (req: Request, res: Response) => {
  const role = req.user?.roleId;
  if (role === 'VT004') return thucPhamYeuThichController.getAll(req, res);
});
thucPhamYeuThichRoutes.post('/:id', authMiddleware, checkRole(['VT004']), (req: Request, res: Response) => {
  const role = req.user?.roleId;
  if (role === 'VT004') return thucPhamYeuThichController.insert(req, res);
});
thucPhamYeuThichRoutes.delete('/:id', authMiddleware, checkRole(['VT004']), (req: Request, res: Response) => {
  const role = req.user?.roleId;
  if (role === 'VT004') return thucPhamYeuThichController.delete(req, res);
});

export default thucPhamYeuThichRoutes;
