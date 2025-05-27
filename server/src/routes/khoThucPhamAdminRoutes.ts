import { Router } from "express";
import { KhoThucPhamController } from "../controllers/khoThucPhamController.js";

const khoThucPhamAdminRoutes = Router();
const khoThucPhamController = new KhoThucPhamController();

khoThucPhamAdminRoutes.get('/', khoThucPhamController.getAllForAdmin);

export default khoThucPhamAdminRoutes;
