import { Router } from "express";
import productRoutes from "./productRoutes.js";
import providerRoutes from "./providerRoutes.js";
import uploadRoutes from "./uploadRoutes.js";
import categoryRoutes from "./categoryRoutes.js";
import importReceiptRoutes from "./importReceiptRoutes.js";
import exportReceiptRoutes from "./exportReceiptRoutes.js";

const router = Router();

router.use('/v1/admin-products', productRoutes)
router.use('/v1/admin-providers', providerRoutes)
router.use('/v1/categories', categoryRoutes)
router.use('/v1/import-receipts', importReceiptRoutes)
router.use('/v1/export-receipts', exportReceiptRoutes)
router.use('/upload', uploadRoutes)

export default router;
