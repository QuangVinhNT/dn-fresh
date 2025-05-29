import { Router } from "express";
import { DanhMucController } from "../controllers/danhMucController.js";

const danhMucRoutes = Router();
const danhMucController = new DanhMucController();

danhMucRoutes.get('/', danhMucController.getAll);
danhMucRoutes.get('/filter', danhMucController.getAllForFilter);
danhMucRoutes.get('/select-box', danhMucController.getAllForSelectBox);
danhMucRoutes.get('/:id', danhMucController.getById);
danhMucRoutes.post('/', danhMucController.insertCategory);
danhMucRoutes.put('/:id', danhMucController.updateCategory);
danhMucRoutes.delete('/:id', danhMucController.deleteCategory);

export default danhMucRoutes;
