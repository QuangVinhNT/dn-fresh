import { Router } from "express";
import { DanhMucController } from "../controllers/danhMucController.js";

const danhMucRoutes = Router();
const danhMucController = new DanhMucController();

danhMucRoutes.get('/filter', danhMucController.getAllForFilter);

export default danhMucRoutes;
