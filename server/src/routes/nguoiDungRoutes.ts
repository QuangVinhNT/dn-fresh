import { Router } from "express";
import { NguoiDungController } from "../controllers/nguoiDungController.js";

const nguoiDungRoutes = Router();
const nguoiDungController = new NguoiDungController();

nguoiDungRoutes.get('/khach-hang', nguoiDungController.getAllCustomer);
nguoiDungRoutes.get('/nhan-vien', nguoiDungController.getAllStaff);

export default nguoiDungRoutes;
