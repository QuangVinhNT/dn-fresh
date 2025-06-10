import { Request, Response, Router } from "express";
import { KhoThucPhamController } from "../controllers/khoThucPhamController.js";
import { fakeAuth } from "../middlewares/fakeAuthMiddleware.js";

const khoThucPhamRouter = Router();
const khoThucPhamController = new KhoThucPhamController();

khoThucPhamRouter.get('/', fakeAuth('staff'), (req: Request, res: Response) => {
  const role = req.user?.role;
  if (role === 'admin') return khoThucPhamController.getAllForAdmin(req, res);
  return khoThucPhamController.getAll(req, res);
});

khoThucPhamRouter.get('/giam-gia', fakeAuth(), (req: Request, res: Response) => {
  return khoThucPhamController.getAllDiscount(req, res);
});

khoThucPhamRouter.get('/:id', fakeAuth('admin'), (req: Request, res: Response) => {
  const role = req.user?.role;
  if (role === 'admin') return khoThucPhamController.getByIdForAdmin(req, res);
  return khoThucPhamController.getById(req, res);
});

khoThucPhamRouter.post('/', fakeAuth('admin'), (req: Request, res: Response) => {
  const role = req.user?.role;
  if (role === 'admin') return khoThucPhamController.insertProduct(req, res);
});

khoThucPhamRouter.put('/:id', fakeAuth('admin'), (req: Request, res: Response) => {
  const role = req.user?.role;
  if (role === 'admin') return khoThucPhamController.updateProduct(req, res);
});

khoThucPhamRouter.delete('/:id', fakeAuth('admin'), (req: Request, res: Response) => {
  const role = req.user?.role;
  if (role === 'admin') return khoThucPhamController.deleteProduct(req, res);
});

export default khoThucPhamRouter;
