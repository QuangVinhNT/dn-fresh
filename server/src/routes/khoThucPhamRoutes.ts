import { Request, Response, Router } from "express";
import { KhoThucPhamController } from "../controllers/khoThucPhamController.js";
import { authMiddleware } from "../middlewares/authMiddleware.js";

const khoThucPhamRouter = Router();
const khoThucPhamController = new KhoThucPhamController();

khoThucPhamRouter.get('/', authMiddleware, (req: Request, res: Response) => {
  const role = req.user?.roleId;
  if (role === 'VT001') return khoThucPhamController.getAllForAdmin(req, res);
  return khoThucPhamController.getAll(req, res);
});

khoThucPhamRouter.get('/giam-gia', (req: Request, res: Response) => {
  return khoThucPhamController.getAllDiscount(req, res);
});

khoThucPhamRouter.get('/:id', authMiddleware, (req: Request, res: Response) => {
  const role = req.user?.roleId;
  if (role === 'VT001') return khoThucPhamController.getByIdForAdmin(req, res);
  return khoThucPhamController.getById(req, res);
});

khoThucPhamRouter.post('/', authMiddleware, (req: Request, res: Response) => {
  const role = req.user?.roleId;
  if (role === 'VT001') return khoThucPhamController.insertProduct(req, res);
});

khoThucPhamRouter.put('/:id', authMiddleware, (req: Request, res: Response) => {
  const role = req.user?.roleId;
  if (role === 'VT001') return khoThucPhamController.updateProduct(req, res);
});

khoThucPhamRouter.delete('/:id', authMiddleware, (req: Request, res: Response) => {
  const role = req.user?.roleId;
  if (role === 'VT001') return khoThucPhamController.deleteProduct(req, res);
});

export default khoThucPhamRouter;
