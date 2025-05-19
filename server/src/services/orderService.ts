import { RowDataPacket } from "mysql2";
import * as OrderModel from '../models/orderModel.js'
const getAllAdminOrder = async (page: number, limit: number) => {
  try {
    const rows = await OrderModel.getAllAdminOrder(page, limit);
    const data = (rows.data as RowDataPacket[]).map((row): OrderModel.AdminOrderDTO => ({
      id: row.maDonHang,
      createdAt: row.ngayTao,
      customerName: row.hoTenKhachHang,
      status: row.trangThai,
      exportReceiptId: row.maPhieuXuat,
      staffName: row.hoTenNhanVien
    }));
    const total = rows.total as RowDataPacket[];
    return {
      data,
      total: total[0].total
    };
  } catch (error) {
    console.error(`Service error: ${error}`);
    throw error;
  }
}

export {
  getAllAdminOrder
}
