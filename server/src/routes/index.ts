import { Router } from "express";
import danhMucRoutes from "./danhMucRoutes.js";
import donHangRoutes from "./donHangRoutes.js";
import exportReceiptRoutes from "./exportReceiptRoutes.js";
import importReceiptRoutes from "./importReceiptRoutes.js";
import khoThucPhamAdminRoutes from "./khoThucPhamAdminRoutes.js";
import khoThucPhamRouter from "./khoThucPhamRoutes.js";
import nguoiDungRoutes from "./nguoiDungRoutes.js";
import orderRoutes from "./orderRoutes.js";
import providerRoutes from "./providerRoutes.js";
import thucPhamYeuThichRoutes from "./thucPhamYeuThichRoutes.js";
import uploadRoutes from "./uploadRoutes.js";

const router = Router();

router.use('/v1/admin-providers', providerRoutes);
router.use('/v1/import-receipts', importReceiptRoutes);
router.use('/v1/export-receipts', exportReceiptRoutes);
router.use('/v1/admin-orders', orderRoutes);

router.use('/v1/kho-thuc-pham', khoThucPhamRouter);
router.use('/v1/danh-muc', danhMucRoutes);
router.use('/v1/thuc-pham-yeu-thich', thucPhamYeuThichRoutes);
router.use('/v1/don-hang', donHangRoutes);

router.use('/v1/admin/kho-thuc-pham', khoThucPhamAdminRoutes);
router.use('/v1/admin/nguoi-dung', nguoiDungRoutes);

router.use('/upload', uploadRoutes);

export default router;
