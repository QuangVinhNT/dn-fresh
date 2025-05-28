import { Router } from "express";
import danhMucRoutes from "./danhMucRoutes.js";
import donHangAdminRoutes from "./donHangAdminRoutes.js";
import donHangRoutes from "./donHangRoutes.js";
import khoThucPhamAdminRoutes from "./khoThucPhamAdminRoutes.js";
import khoThucPhamRouter from "./khoThucPhamRoutes.js";
import nguoiDungRoutes from "./nguoiDungRoutes.js";
import nhaCungCapRoutes from "./nhaCungCapRoutes.js";
import phieuNhapRoutes from "./phieuNhapRoutes.js";
import phieuXuatRoutes from "./phieuXuatRoutes.js";
import thucPhamYeuThichRoutes from "./thucPhamYeuThichRoutes.js";
import uploadRoutes from "./uploadRoutes.js";

const router = Router();

router.use('/v1/kho-thuc-pham', khoThucPhamRouter);
router.use('/v1/danh-muc', danhMucRoutes);
router.use('/v1/thuc-pham-yeu-thich', thucPhamYeuThichRoutes);
router.use('/v1/don-hang', donHangRoutes);

router.use('/v1/admin/kho-thuc-pham', khoThucPhamAdminRoutes);
router.use('/v1/admin/nguoi-dung', nguoiDungRoutes);
router.use('/v1/admin/phieu-nhap', phieuNhapRoutes);
router.use('/v1/admin/phieu-xuat', phieuXuatRoutes);
router.use('/v1/admin/nha-cung-cap', nhaCungCapRoutes);
router.use('/v1/admin/don-hang', donHangAdminRoutes);

router.use('/upload', uploadRoutes);

export default router;
