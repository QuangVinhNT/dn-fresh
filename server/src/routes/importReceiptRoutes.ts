import { Router } from "express";
import { getAllImportReceipt } from "../controllers/importReceiptController.js";

const importReceiptRoutes = Router();

importReceiptRoutes.get('/', getAllImportReceipt)

export default importReceiptRoutes;
