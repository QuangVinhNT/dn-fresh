import { Router } from "express";
import { getAllCustomer } from "../controllers/userController.js";

const userRoutes = Router();

userRoutes.get('/customers', getAllCustomer);

export default userRoutes;
