import { Router } from "express";
import { getAllCustomer, getAllStaff } from "../controllers/userController.js";

const userRoutes = Router();

userRoutes.get('/customers', getAllCustomer);
userRoutes.get('/staffs', getAllStaff);

export default userRoutes;
