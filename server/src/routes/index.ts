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
import favouriteProductRoutes from "./favouriteProductRoutes.js";
import khoThucPhamRouter from "./khoThucPhamRoutes.js";
import danhMucRoutes from "./danhMucRoutes.js";
import thucPhamYeuThichRoutes from "./thucPhamYeuThichRoutes.js";
import donHangRoutes from "./donHangRoutes.js";
import khoThucPhamAdminRoutes from "./khoThucPhamAdminRoutes.js";

const router = Router();

router.use('/v1/admin/products', adminProductRoutes);
router.use('/v1/admin-providers', providerRoutes);
router.use('/v1/categories', categoryRoutes);
router.use('/v1/import-receipts', importReceiptRoutes);
router.use('/v1/export-receipts', exportReceiptRoutes);
router.use('/v1/users', userRoutes);
router.use('/v1/admin-orders', orderRoutes);

router.use('/v1/products', productRoutes);
router.use('/v1/favourites', favouriteProductRoutes);

router.use('/v1/kho-thuc-pham', khoThucPhamRouter);
router.use('/v1/danh-muc', danhMucRoutes);
router.use('/v1/thuc-pham-yeu-thich', thucPhamYeuThichRoutes);
router.use('/v1/don-hang', donHangRoutes);

router.use('/v1/admin/kho-thuc-pham', khoThucPhamAdminRoutes);

router.use('/upload', uploadRoutes);

export default router;
