import { Router } from "express";
import { DiaChiController } from "../controllers/diaChiController.js";

const diaChiRoutes = Router();
const diaChiController = new DiaChiController();

diaChiRoutes.get('/tinh-thanhpho', diaChiController.getAllCity);
diaChiRoutes.get('/phuong-xa', diaChiController.getAllCommuneByCityId);

export default diaChiRoutes;
