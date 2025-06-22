import { Request, Response, Router } from "express";
import { ChiTietPhieuXuatController } from "../controllers/chiTietPhieuXuatController.js";
import { PhieuXuatController } from "../controllers/phieuXuatController.js";
import { authMiddleware } from "../middlewares/authMiddleware.js";
import { checkRole } from "../middlewares/checkRoleMiddleware.js";

const phieuXuatRoutes = Router();
const phieuXuatController = new PhieuXuatController();
const chiTietPhieuXuatController = new ChiTietPhieuXuatController();

phieuXuatRoutes.get('/', authMiddleware, checkRole(['VT001', 'VT002']), (req: Request, res: Response) => {
  const role = req.user?.roleId;
  if (role === 'VT002') return phieuXuatController.getAllForStaff(req, res);
  if (role === 'VT001') return phieuXuatController.getAll(req, res);
});

phieuXuatRoutes.get('/:id', authMiddleware, checkRole(['VT001', 'VT002']), (req: Request, res: Response) => {
  const role = req.user?.roleId;
  if (role === 'VT002' || role === 'VT001') return phieuXuatController.getById(req, res);
});

phieuXuatRoutes.post('/', authMiddleware, checkRole(['VT001']), (req: Request, res: Response) => {
  const role = req.user?.roleId;
  if (role === 'VT001') return phieuXuatController.insert(req, res);
});

phieuXuatRoutes.post('/thuc-pham/:id', authMiddleware, checkRole(['VT002']), (req: Request, res: Response) => {
  const role = req.user?.roleId;
  if (role === 'VT002') return chiTietPhieuXuatController.insert(req, res);
});

phieuXuatRoutes.put('/:id', authMiddleware, checkRole(['VT001']), (req: Request, res: Response) => {
  const role = req.user?.roleId;
  if (role === 'VT001') return phieuXuatController.update(req, res);
});

phieuXuatRoutes.put('/thuc-pham/:id', authMiddleware, checkRole(['VT002']), (req: Request, res: Response) => {
  const role = req.user?.roleId;
  if (role === 'VT002') return chiTietPhieuXuatController.update(req, res);
});

phieuXuatRoutes.delete('/thuc-pham/:id', authMiddleware, checkRole(['VT002']), (req: Request, res: Response) => {
  const role = req.user?.roleId;
  if (role === 'VT002') return chiTietPhieuXuatController.delete(req, res);
});

phieuXuatRoutes.patch('/:id/cancel', authMiddleware, checkRole(['VT001']), (req: Request, res: Response) => {
  const role = req.user?.roleId;
  if (role === 'VT001') return phieuXuatController.softDelete(req, res);
});

phieuXuatRoutes.patch('/:id/approve', authMiddleware, checkRole(['VT001']), (req: Request, res: Response) => {
  const role = req.user?.roleId;
  if (role === 'VT001') return phieuXuatController.approveExportReceipt(req, res);
});

phieuXuatRoutes.patch('/:id/request-approve', authMiddleware, checkRole(['VT002']), (req: Request, res: Response) => {
  const role = req.user?.roleId;
  if (role === 'VT002') return phieuXuatController.requestApproveExportReceipt(req, res);
});

export default phieuXuatRoutes;
