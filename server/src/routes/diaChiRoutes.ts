import { Request, Response, Router } from "express";
import { DiaChiController } from "../controllers/diaChiController.js";
import { authMiddleware } from "../middlewares/authMiddleware.js";

const diaChiRoutes = Router();
const diaChiController = new DiaChiController();

diaChiRoutes.get('/khu-vuc-lam-viec/:id', authMiddleware, (req: Request, res: Response) => {
  return diaChiController.getWorkCommuneIdByUserId(req, res);
});

diaChiRoutes.get('/tinh-thanhpho', authMiddleware, (req: Request, res: Response) => {
  return diaChiController.getAllCity(req, res);
});

diaChiRoutes.get('/phuong-xa', authMiddleware, (req: Request, res: Response) => {
  return diaChiController.getAllCommuneByCityId(req, res);
});

diaChiRoutes.get('/:id', (req: Request, res: Response) => {
  return diaChiController.getDetailById(req, res);
});

export default diaChiRoutes;
