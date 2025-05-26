import { pool } from "../configs/database.js";

interface AdminOrderDTO {
  id: string;
  createdAt: string;
  customerName: string;
  status: number;
  exportReceiptId: string;
  staffName: string;
}

const getAllAdminOrder = async (page: number, limit: number) => {
  const offset = (page - 1) * limit;
  try {
    const [rows] = await pool.query(`
      SELECT maDonHang, donhang.ngayTao, kh.hoTen as hoTenKhachHang, donhang.trangThai, maPhieuXuat, nv.hoTen as hoTenNhanVien
      FROM donhang
      INNER JOIN nguoidung as kh ON kh.maNguoiDung = donhang.maKhachHang
      INNER JOIN nguoidung as nv ON nv.maNguoiDung = donhang.maNhanVien
      LIMIT ?
      OFFSET ?
      `, [limit, offset]);
    const total = await pool.query(`
      SELECT COUNT(maDonHang) as total
      FROM donhang
      `);
    return {
      data: rows,
      total
    };
  } catch (error) {
    console.error(`Model error: ${error}`);
    throw error;
  }
}

export {
  AdminOrderDTO,
  getAllAdminOrder
}
