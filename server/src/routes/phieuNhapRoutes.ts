import { Request, Response, Router } from "express";
import { PhieuNhapController } from "../controllers/phieuNhapController.js";
import { fakeAuth } from "../middlewares/fakeAuthMiddleware.js";
import { checkRole } from "../middlewares/checkRoleMiddleware.js";
import { ChiTietThucPhamNhapController } from "../controllers/chiTietThucPhamNhapController.js";

const phieuNhapRoutes = Router();
const phieuNhapController = new PhieuNhapController();
const chiTietThucPhamNhapController = new ChiTietThucPhamNhapController();

phieuNhapRoutes.get('/', fakeAuth('staff'), checkRole(['staff', 'admin']), (req: Request, res: Response) => {
  const role = req.user?.role;
  if (role === 'admin') return phieuNhapController.getAll(req, res);
  if (role === 'staff') return phieuNhapController.getAllForStaff(req, res);
});

phieuNhapRoutes.get('/:id', fakeAuth('admin'), checkRole(['staff', 'admin']), (req: Request, res: Response) => {
  const role = req.user?.role;
  if (role === 'admin' || role === 'staff') return phieuNhapController.getById(req, res);
});

phieuNhapRoutes.post('/', fakeAuth('admin'), checkRole(['admin']), (req: Request, res: Response) => {
  const role = req.user?.role;
  if (role === 'admin') return phieuNhapController.insert(req, res);
});

phieuNhapRoutes.post('/:id', fakeAuth('staff'), checkRole(['staff']), (req: Request, res: Response) => {
  const role = req.user?.role;
  if (role === 'staff') return chiTietThucPhamNhapController.insert(req, res);
});

phieuNhapRoutes.put('/:id', fakeAuth('admin'), checkRole(['admin']), (req: Request, res: Response) => {
  const role = req.user?.role;
  if (role === 'admin') return phieuNhapController.update(req, res);
});

phieuNhapRoutes.put('/thuc-pham/:id', fakeAuth('staff'), checkRole(['staff']), (req: Request, res: Response) => {
  const role = req.user?.role;
  if (role === 'staff') return chiTietThucPhamNhapController.update(req, res);
});

phieuNhapRoutes.patch('/:id/cancel', fakeAuth('admin'), checkRole(['admin']), (req: Request, res: Response) => {
  const role = req.user?.role;
  if (role === 'admin') return phieuNhapController.softDelete(req, res);
});


phieuNhapRoutes.patch('/:id/approve', fakeAuth('admin'), checkRole(['admin']), (req: Request, res: Response) => {
  const role = req.user?.role;
  if (role === 'admin') return phieuNhapController.approveImportReceipt(req, res);
});

phieuNhapRoutes.patch('/:id/request-approve', fakeAuth('staff'), checkRole(['staff']), (req: Request, res: Response) => {
  const role = req.user?.role;
  if (role === 'staff') return phieuNhapController.requestApproveImportReceipt(req, res);
});

phieuNhapRoutes.delete('/thuc-pham/:id', fakeAuth('staff'), checkRole(['staff']), (req: Request, res: Response) => {
  const role = req.user?.role;
  if (role === 'staff') return chiTietThucPhamNhapController.delete(req, res);
});

export default phieuNhapRoutes;
