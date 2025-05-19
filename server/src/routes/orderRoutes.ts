import { Router } from "express";
import { getAllAdminOrder } from "../controllers/orderController.js";

const orderRoutes = Router();

orderRoutes.get('/', getAllAdminOrder);

export default orderRoutes;
