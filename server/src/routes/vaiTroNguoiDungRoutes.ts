import { Router } from "express";
import { VaiTroNguoiDungController } from "../controllers/vaiTroNguoiDungController.js";

const vaiTroNguoiDungRoutes = Router();
const vaiTroNguoiDungController = new VaiTroNguoiDungController();

vaiTroNguoiDungRoutes.get('/nguoi-dung/:id', vaiTroNguoiDungController.getAllRoleByUserId);
vaiTroNguoiDungRoutes.post('/', vaiTroNguoiDungController.insertUserRole);
vaiTroNguoiDungRoutes.delete('/staffs/:id', vaiTroNguoiDungController.deleteAllStaffRole);
vaiTroNguoiDungRoutes.put('/:id', vaiTroNguoiDungController.updateRole);

export default vaiTroNguoiDungRoutes;
