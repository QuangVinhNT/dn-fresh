import { Router } from "express";
import { PhieuNhapController } from "../controllers/phieuNhapController.js";

const phieuNhapRoutes = Router();
const phieuNhapController = new PhieuNhapController();

phieuNhapRoutes.get('/', phieuNhapController.getAll);

export default phieuNhapRoutes;
