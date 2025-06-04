import { Router } from "express";
import { NguoiDungController } from "../controllers/nguoiDungController.js";

const nguoiDungRoutes = Router();
const nguoiDungController = new NguoiDungController();

nguoiDungRoutes.get('/khach-hang', nguoiDungController.getAllCustomer);
nguoiDungRoutes.get('/nhan-vien', nguoiDungController.getAllStaff);
nguoiDungRoutes.get('/khach-hang/:id', nguoiDungController.getCustomerById);
nguoiDungRoutes.get('/nhan-vien/:id', nguoiDungController.getStaffById)
nguoiDungRoutes.post('/', nguoiDungController.insertUser);
nguoiDungRoutes.patch('/:id/lock', nguoiDungController.lockAccount);
nguoiDungRoutes.patch('/:id/unlock', nguoiDungController.unlockAccount);

export default nguoiDungRoutes;
