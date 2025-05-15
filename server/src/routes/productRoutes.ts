import { Router } from "express";
import { getAdminProductById, getAllAdminProduct, insertProduct } from "../controllers/productController.js";

const productRoutes = Router();

productRoutes.get('/', getAllAdminProduct)
productRoutes.post('/', insertProduct)
productRoutes.get('/:id', getAdminProductById)

export default productRoutes;
