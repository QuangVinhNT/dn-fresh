import { Router } from "express";
import { ThucPhamYeuThichController } from "../controllers/thucPhamYeuThichController.js";

const thucPhamYeuThichRoutes = Router();
const thucPhamYeuThichController = new ThucPhamYeuThichController();

thucPhamYeuThichRoutes.get('/', thucPhamYeuThichController.getAll)
thucPhamYeuThichRoutes.post('/', thucPhamYeuThichController.insert)
thucPhamYeuThichRoutes.delete('/', thucPhamYeuThichController.delete)

export default thucPhamYeuThichRoutes;
