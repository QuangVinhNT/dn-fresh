import { Router } from "express";
import { getAdminProductById, getAllAdminProduct, insertProduct } from "../controllers/productController.js";

const adminProductRoutes = Router();

adminProductRoutes.get('/', getAllAdminProduct)
adminProductRoutes.post('/', insertProduct)
adminProductRoutes.get('/:id', getAdminProductById)

export default adminProductRoutes;
