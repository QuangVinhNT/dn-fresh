import { Router } from "express";
import { KhoThucPhamController } from "../controllers/khoThucPhamController.js";

const khoThucPhamAdminRoutes = Router();
const khoThucPhamController = new KhoThucPhamController();

khoThucPhamAdminRoutes.get('/', khoThucPhamController.getAllForAdmin);
khoThucPhamAdminRoutes.get('/:id', khoThucPhamController.getByIdForAdmin);
khoThucPhamAdminRoutes.post('/', khoThucPhamController.insertProduct);
khoThucPhamAdminRoutes.put('/:id', khoThucPhamController.updateProduct);
khoThucPhamAdminRoutes.delete('/:id', khoThucPhamController.deleteProduct);

export default khoThucPhamAdminRoutes;
