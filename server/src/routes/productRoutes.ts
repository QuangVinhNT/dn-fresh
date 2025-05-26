import { Router } from "express";
import { getAllDiscountProduct, getAllProduct, getProductById } from "../controllers/productController.js";

const productRoutes = Router();

productRoutes.get('/', getAllProduct);
productRoutes.get('/discount', getAllDiscountProduct)
productRoutes.get('/:id', getProductById);

export default productRoutes;
