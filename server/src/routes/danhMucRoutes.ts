import { Router } from "express";
import { DanhMucController } from "../controllers/danhMucController.js";

const danhMucRoutes = Router();
const danhMucController = new DanhMucController();

danhMucRoutes.get('/', danhMucController.getAll);
danhMucRoutes.get('/filter', danhMucController.getAllForFilter);
danhMucRoutes.get('/select-box', danhMucController.getAllForSelectBox);

export default danhMucRoutes;
