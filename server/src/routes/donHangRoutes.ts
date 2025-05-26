import { Router } from "express";
import { DonHangController } from "../controllers/donHangController.js";

const donHangRoutes = Router();
const donHangController = new DonHangController();

donHangRoutes.get('/', donHangController.getAll);

export default donHangRoutes;
