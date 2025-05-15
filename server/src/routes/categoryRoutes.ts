import { Router } from "express";
import { getCategoriesForSelectBox } from "../controllers/categoryController.js";

const categoryRoutes = Router();

categoryRoutes.get('/select-box', getCategoriesForSelectBox)

export default categoryRoutes;
