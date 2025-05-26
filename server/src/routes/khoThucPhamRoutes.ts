import { Router } from "express";
import { KhoThucPhamController } from "../controllers/khoThucPhamController.js";

const khoThucPhamRouter = Router();
const khoThucPhamController = new KhoThucPhamController();

khoThucPhamRouter.get('/', khoThucPhamController.getAll);
khoThucPhamRouter.get('/giam-gia', khoThucPhamController.getAllDiscount);
khoThucPhamRouter.get('/:id', khoThucPhamController.getById);

export default khoThucPhamRouter;
