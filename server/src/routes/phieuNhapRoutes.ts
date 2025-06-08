import { Router } from "express";
import { PhieuNhapController } from "../controllers/phieuNhapController.js";

const phieuNhapRoutes = Router();
const phieuNhapController = new PhieuNhapController();

phieuNhapRoutes.get('/', phieuNhapController.getAll);
phieuNhapRoutes.get('/:id', phieuNhapController.getById);
phieuNhapRoutes.post('/', phieuNhapController.insert);
phieuNhapRoutes.put('/:id', phieuNhapController.update)
phieuNhapRoutes.patch('/:id/cancel', phieuNhapController.softDelete)
phieuNhapRoutes.patch('/:id/approve', phieuNhapController.approveImportReceipt)

export default phieuNhapRoutes;
