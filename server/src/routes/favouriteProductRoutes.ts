import { Router } from "express";
import { deleteFavouriteProduct, getAllFavouriteProduct, insertFavouriteProduct } from "../controllers/favouriteProductController.js";

const favouriteProductRoutes = Router();

favouriteProductRoutes.get('/', getAllFavouriteProduct);
favouriteProductRoutes.post('/', insertFavouriteProduct);
favouriteProductRoutes.delete('/', deleteFavouriteProduct)

export default favouriteProductRoutes;
