import { Router } from "express";
import { getAllExportReceipt } from "../controllers/exportReceipController.js";

const exportReceiptRoutes = Router();

exportReceiptRoutes.get('/', getAllExportReceipt)

export default exportReceiptRoutes;
