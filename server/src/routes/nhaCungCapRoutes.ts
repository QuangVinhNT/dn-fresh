import { Router } from "express";
import { NhaCungCapController } from "../controllers/nhaCungCapController.js";

const nhaCungCapRoutes = Router();
const nhaCungCapController = new NhaCungCapController();

nhaCungCapRoutes.get("/", nhaCungCapController.getAll);
nhaCungCapRoutes.get('/:id', nhaCungCapController.getById);
nhaCungCapRoutes.post('/', nhaCungCapController.insertProvider);
nhaCungCapRoutes.put('/:id', nhaCungCapController.updateProvider);
nhaCungCapRoutes.delete('/:id', nhaCungCapController.deleteProvider);

export default nhaCungCapRoutes;
