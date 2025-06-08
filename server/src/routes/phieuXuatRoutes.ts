import { Router } from "express";
import { PhieuXuatController } from "../controllers/phieuXuatController.js";

const phieuXuatRoutes = Router();
const phieuXuatController = new PhieuXuatController();

phieuXuatRoutes.get('/', phieuXuatController.getAll);
phieuXuatRoutes.get('/:id', phieuXuatController.getById);
phieuXuatRoutes.post('/', phieuXuatController.insert);
phieuXuatRoutes.patch('/:id/cancel', phieuXuatController.softDelete);
phieuXuatRoutes.patch('/:id/approve', phieuXuatController.approveExportReceipt);
phieuXuatRoutes.put('/:id', phieuXuatController.update);

export default phieuXuatRoutes;
