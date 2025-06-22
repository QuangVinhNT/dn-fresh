import { Request, Response, Router } from "express";
import { NhaCungCapController } from "../controllers/nhaCungCapController.js";
import { authMiddleware } from "../middlewares/authMiddleware.js";

const nhaCungCapRoutes = Router();
const nhaCungCapController = new NhaCungCapController();

nhaCungCapRoutes.get('/', authMiddleware, (req: Request, res: Response) => {
  return nhaCungCapController.getAll(req, res);
});

nhaCungCapRoutes.get('/:id', authMiddleware, (req: Request, res: Response) => {
  return nhaCungCapController.getById(req, res);
});

nhaCungCapRoutes.post('/', authMiddleware, (req: Request, res: Response) => {
  return nhaCungCapController.insertProvider(req, res);
});

nhaCungCapRoutes.put('/:id', authMiddleware, (req: Request, res: Response) => {
  return nhaCungCapController.updateProvider(req, res);
});

nhaCungCapRoutes.delete('/:id', authMiddleware, (req: Request, res: Response) => {
  return nhaCungCapController.deleteProvider(req, res);
});

export default nhaCungCapRoutes;
