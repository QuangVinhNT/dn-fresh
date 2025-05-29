import { Router } from "express";
import { DonHangController } from "../controllers/donHangController.js";

const donHangAdminRoutes = Router();
const donHangController = new DonHangController();

donHangAdminRoutes.get('/', donHangController.getAllForAdmin)
donHangAdminRoutes.get('/:id', donHangController.getByIdForAdmin)

export default donHangAdminRoutes;
