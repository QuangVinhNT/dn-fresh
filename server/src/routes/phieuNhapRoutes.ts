import { Request, Response, Router } from "express";
import { ChiTietThucPhamNhapController } from "../controllers/chiTietThucPhamNhapController.js";
import { PhieuNhapController } from "../controllers/phieuNhapController.js";
import { authMiddleware } from "../middlewares/authMiddleware.js";
import { checkRole } from "../middlewares/checkRoleMiddleware.js";

const phieuNhapRoutes = Router();
const phieuNhapController = new PhieuNhapController();
const chiTietThucPhamNhapController = new ChiTietThucPhamNhapController();

phieuNhapRoutes.get('/', authMiddleware, checkRole(['VT002', 'VT001']), (req: Request, res: Response) => {
  const role = req.user?.roleId;
  if (role === 'VT001') return phieuNhapController.getAll(req, res);
  if (role === 'VT002') return phieuNhapController.getAllForStaff(req, res);
});

phieuNhapRoutes.get('/thuc-pham/:id', authMiddleware, checkRole(['VT002']), (req: Request, res: Response) => {
  const role = req.user?.roleId;
  if (role === 'VT002') return chiTietThucPhamNhapController.getByIdForExport(req, res);
});

phieuNhapRoutes.get('/:id', authMiddleware, checkRole(['VT002', 'VT001']), (req: Request, res: Response) => {
  const role = req.user?.roleId;
  if (role === 'VT001' || role === 'VT002') return phieuNhapController.getById(req, res);
});

phieuNhapRoutes.post('/', authMiddleware, checkRole(['VT001']), (req: Request, res: Response) => {
  const role = req.user?.roleId;
  if (role === 'VT001') return phieuNhapController.insert(req, res);
});

phieuNhapRoutes.post('/thuc-pham/:id', authMiddleware, checkRole(['VT002']), (req: Request, res: Response) => {
  const role = req.user?.roleId;
  if (role === 'VT002') return chiTietThucPhamNhapController.insert(req, res);
});

phieuNhapRoutes.put('/:id', authMiddleware, checkRole(['VT001']), (req: Request, res: Response) => {
  const role = req.user?.roleId;
  if (role === 'VT001') return phieuNhapController.update(req, res);
});

phieuNhapRoutes.put('/thuc-pham/:id', authMiddleware, checkRole(['VT002']), (req: Request, res: Response) => {
  const role = req.user?.roleId;
  if (role === 'VT002') return chiTietThucPhamNhapController.update(req, res);
});

phieuNhapRoutes.patch('/:id/cancel', authMiddleware, checkRole(['VT001']), (req: Request, res: Response) => {
  const role = req.user?.roleId;
  if (role === 'VT001') return phieuNhapController.softDelete(req, res);
});


phieuNhapRoutes.patch('/:id/approve', authMiddleware, checkRole(['VT001']), (req: Request, res: Response) => {
  const role = req.user?.roleId;
  if (role === 'VT001') return phieuNhapController.approveImportReceipt(req, res);
});

phieuNhapRoutes.patch('/:id/request-approve', authMiddleware, checkRole(['VT002']), (req: Request, res: Response) => {
  const role = req.user?.roleId;
  if (role === 'VT002') return phieuNhapController.requestApproveImportReceipt(req, res);
});

phieuNhapRoutes.delete('/thuc-pham/:id', authMiddleware, checkRole(['VT002']), (req: Request, res: Response) => {
  const role = req.user?.roleId;
  if (role === 'VT002') return chiTietThucPhamNhapController.delete(req, res);
});

export default phieuNhapRoutes;
