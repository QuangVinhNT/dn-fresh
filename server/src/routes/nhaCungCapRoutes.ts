import { Router } from "express";
import { NhaCungCapController } from "../controllers/nhaCungCapController.js";

const nhaCungCapRoutes = Router();
const nhaCungCapController = new NhaCungCapController();

nhaCungCapRoutes.get("/", nhaCungCapController.getAll);

export default nhaCungCapRoutes;
