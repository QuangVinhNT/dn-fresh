import { Router } from "express";
import danhMucRoutes from "./danhMucRoutes.js";
import diaChiRoutes from "./diaChiRoutes.js";
import donHangRoutes from "./donHangRoutes.js";
import khoThucPhamRouter from "./khoThucPhamRoutes.js";
import nguoiDungRoutes from "./nguoiDungRoutes.js";
import nhaCungCapRoutes from "./nhaCungCapRoutes.js";
import phieuNhapRoutes from "./phieuNhapRoutes.js";
import phieuXuatRoutes from "./phieuXuatRoutes.js";
import thucPhamYeuThichRoutes from "./thucPhamYeuThichRoutes.js";
import uploadRoutes from "./uploadRoutes.js";
import vaiTroNguoiDungRoutes from "./vaiTroNguoiDungRoutes.js";
import gioHangRoutes from "./gioHangRoutes.js";
import vnPayRoutes from "./vnPayRoutes.js";
import thongKeRoutes from "./thongKeRoutes.js";

const router = Router();

router.use('/v1/kho-thuc-pham', khoThucPhamRouter);
router.use('/v1/danh-muc', danhMucRoutes);
router.use('/v1/thuc-pham-yeu-thich', thucPhamYeuThichRoutes);
router.use('/v1/don-hang', donHangRoutes);
router.use('/v1/nha-cung-cap', nhaCungCapRoutes);
router.use('/v1/phieu-nhap', phieuNhapRoutes);
router.use('/v1/phieu-xuat', phieuXuatRoutes);
router.use('/v1/nguoi-dung', nguoiDungRoutes);
router.use('/v1/gio-hang', gioHangRoutes);

router.use('/upload', uploadRoutes);
router.use('/dia-chi', diaChiRoutes);
router.use('/vai-tro', vaiTroNguoiDungRoutes);
router.use('/vnpay', vnPayRoutes);
router.use('/thong-ke', thongKeRoutes);

export default router;
