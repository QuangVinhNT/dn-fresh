import { Router } from "express";
import providerRoutes from "./providerRoutes.js";
import uploadRoutes from "./uploadRoutes.js";
import categoryRoutes from "./categoryRoutes.js";
import importReceiptRoutes from "./importReceiptRoutes.js";
import exportReceiptRoutes from "./exportReceiptRoutes.js";
import userRoutes from "./userRoutes.js";
import orderRoutes from "./orderRoutes.js";
import adminProductRoutes from "./adminProductRoutes.js";
import productRoutes from "./productRoutes.js";

const router = Router();

router.use('/v1/admin/products', adminProductRoutes);
router.use('/v1/admin-providers', providerRoutes);
router.use('/v1/categories', categoryRoutes);
router.use('/v1/import-receipts', importReceiptRoutes);
router.use('/v1/export-receipts', exportReceiptRoutes);
router.use('/v1/users', userRoutes);
router.use('/v1/admin-orders', orderRoutes);

router.use('/v1/products', productRoutes);

router.use('/upload', uploadRoutes);

export default router;
