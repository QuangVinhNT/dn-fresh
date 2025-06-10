import { Router } from "express";
import { DonHangController } from "../controllers/donHangController.js";

const donHangRoutes = Router();
const donHangController = new DonHangController();

donHangRoutes.get('/', donHangController.getAll);
donHangRoutes.get('/:id', donHangController.getById);
donHangRoutes.post('/', donHangController.insertOrder);
donHangRoutes.patch('/:id/pack', donHangController.confirmPack);
donHangRoutes.patch('/:id/export', donHangController.confirmExport);
donHangRoutes.patch('/:id/finish', donHangController.confirmFinish);
donHangRoutes.patch('/:id/cancel', donHangController.cancelOrder);

export default donHangRoutes;
