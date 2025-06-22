import { Request, Response, Router } from "express";
import { DanhMucController } from "../controllers/danhMucController.js";
import { authMiddleware } from "../middlewares/authMiddleware.js";

const danhMucRoutes = Router();
const danhMucController = new DanhMucController();

danhMucRoutes.get('/', authMiddleware, (req: Request, res: Response) => {
  return danhMucController.getAll(req, res);
});

danhMucRoutes.get('/filter', authMiddleware, (req: Request, res: Response) => {
  return danhMucController.getAllForFilter(req, res);
});

danhMucRoutes.get('/select-box', authMiddleware, (req: Request, res: Response) => {
  return danhMucController.getAllForSelectBox(req, res);
});

danhMucRoutes.get('/:id', authMiddleware, (req: Request, res: Response) => {
  return danhMucController.getById(req, res);
});

danhMucRoutes.post('/', authMiddleware, (req: Request, res: Response) => {
  return danhMucController.insertCategory(req, res);
});

danhMucRoutes.put('/:id', authMiddleware, (req: Request, res: Response) => {
  return danhMucController.updateCategory(req, res);
});

danhMucRoutes.delete('/:id', authMiddleware, (req: Request, res: Response) => {
  return danhMucController.deleteCategory(req, res);
});

export default danhMucRoutes;
