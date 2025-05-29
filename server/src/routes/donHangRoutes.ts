import { Router } from "express";
import { DonHangController } from "../controllers/donHangController.js";

const donHangRoutes = Router();
const donHangController = new DonHangController();

donHangRoutes.get('/', donHangController.getAll);
donHangRoutes.get('/:id', donHangController.getById);
donHangRoutes.post('/', donHangController.insertOrder);

export default donHangRoutes;
