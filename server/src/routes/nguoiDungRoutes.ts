import { Request, Response, Router } from "express";
import { NguoiDungController } from "../controllers/nguoiDungController.js";
import { authMiddleware } from "../middlewares/authMiddleware.js";
import { checkRole } from "../middlewares/checkRoleMiddleware.js";

const nguoiDungRoutes = Router();
const nguoiDungController = new NguoiDungController();

nguoiDungRoutes.get('/khach-hang', authMiddleware, checkRole(['VT001']), (req: Request, res: Response) => {
  const role = req.user?.roleId;
  if (role === 'VT001') return nguoiDungController.getAllCustomer(req, res);
});

nguoiDungRoutes.get('/nhan-vien', authMiddleware, checkRole(['VT001']), (req: Request, res: Response) => {
  const role = req.user?.roleId;
  if (role === 'VT001') return nguoiDungController.getAllStaff(req, res);
});

nguoiDungRoutes.get('/khach-hang/:id', authMiddleware, checkRole(['VT001']), (req: Request, res: Response) => {
  const role = req.user?.roleId;
  if (role == 'VT001') return nguoiDungController.getCustomerById(req, res);
});

nguoiDungRoutes.get('/nhan-vien/:id', authMiddleware, checkRole(['VT001']), (req: Request, res: Response) => {
  const role = req.user?.roleId;
  if (role === 'VT001') return nguoiDungController.getStaffById(req, res);
});

nguoiDungRoutes.post('/forgot-password', (req: Request, res: Response) => {
  return nguoiDungController.forgotPassword(req, res);
});

nguoiDungRoutes.post('/forgot-password/reset', (req: Request, res: Response) => {
  return nguoiDungController.verifyCodeAndResetPassword(req, res);
});

nguoiDungRoutes.get('/:id', (req: Request, res: Response) => {
  return nguoiDungController.getById(req, res);
});

nguoiDungRoutes.post('/', authMiddleware, checkRole(['VT001']), (req: Request, res: Response) => {
  const role = req.user?.roleId;
  if (role === 'VT001') return nguoiDungController.insertUser(req, res);
});

nguoiDungRoutes.post('/login', (req: Request, res: Response) => {
  return nguoiDungController.login(req, res);
});

nguoiDungRoutes.post('/register', (req: Request, res: Response) => {
  return nguoiDungController.register(req, res);
});

nguoiDungRoutes.post('/get-role-token', (req: Request, res: Response) => {
  return nguoiDungController.getRoleToken(req, res);
});

nguoiDungRoutes.post('/verify-email', (req: Request, res: Response) => {
  return nguoiDungController.verifyEmail(req, res);
});

nguoiDungRoutes.put('/:id', authMiddleware, checkRole(['VT001', 'VT002', 'VT003', 'VT004']), (req: Request, res: Response) => {
  return nguoiDungController.updateUser(req, res);
});

nguoiDungRoutes.patch('/:id/lock', authMiddleware, checkRole(['VT001']), (req: Request, res: Response) => {
  const role = req.user?.roleId;
  if (role === 'VT001') return nguoiDungController.lockAccount(req, res);
});

nguoiDungRoutes.patch('/:id/unlock', authMiddleware, checkRole(['VT001']), (req: Request, res: Response) => {
  const role = req.user?.roleId;
  if (role === 'VT001') return nguoiDungController.unlockAccount(req, res);
});

export default nguoiDungRoutes;
