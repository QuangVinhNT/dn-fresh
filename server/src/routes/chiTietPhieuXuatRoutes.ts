import { Router } from "express";
import { ChiTietPhieuXuatController } from "../controllers/chiTietPhieuXuatController.js";

const chiTietPhieuXuatRoutes = Router();
const chiTietPhieuXuatController = new ChiTietPhieuXuatController();

chiTietPhieuXuatRoutes.post("/", chiTietPhieuXuatController.insert);
chiTietPhieuXuatRoutes.put("/:id", chiTietPhieuXuatController.update);
chiTietPhieuXuatRoutes.delete("/:id", chiTietPhieuXuatController.delete);
