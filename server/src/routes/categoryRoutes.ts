import { Router } from "express";
import { getAllCategory, getCategoriesForSelectBox } from "../controllers/categoryController.js";

const categoryRoutes = Router();

categoryRoutes.get('/', getAllCategory);
categoryRoutes.get('/select-box', getCategoriesForSelectBox);

export default categoryRoutes;
