import { Router } from "express";
import { PhieuXuatController } from "../controllers/phieuXuatController.js";

const phieuXuatRoutes = Router();
const phieuXuatController = new PhieuXuatController();

phieuXuatRoutes.get('/', phieuXuatController.getAll);

export default phieuXuatRoutes;
