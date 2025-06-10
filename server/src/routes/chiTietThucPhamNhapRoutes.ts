import { Router } from "express";
import { ChiTietThucPhamNhapController } from "../controllers/chiTietThucPhamNhapController.js";

const chiTietThucPhamNhapRoutes = Router();
const chiTietThucPhamNhapController = new ChiTietThucPhamNhapController();

chiTietThucPhamNhapRoutes.post("/", chiTietThucPhamNhapController.insert);
chiTietThucPhamNhapRoutes.put("/:id", chiTietThucPhamNhapController.update);
chiTietThucPhamNhapRoutes.delete("/:id", chiTietThucPhamNhapController.delete);

export default chiTietThucPhamNhapRoutes;
