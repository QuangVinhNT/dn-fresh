import { pool } from "../configs/database.js";

export class DonHangDAO {

  public getAll = async (page: number, limit: number, userId: string, orderId: string) => {
    const offset = (page - 1) * limit;
    try {
      const [rows] = await pool.query(`
      SELECT dh.maDonHang, dh.ngayTao, dh.trangThai, phuongThucThanhToan, SUM(ctdh.soLuong * tp.donGia) as tongTien
      FROM donhang AS dh
      LEFT JOIN chitietdonhang AS ctdh ON ctdh.maDonHang = dh.maDonHang
      LEFT JOIN khothucpham AS tp ON ctdh.maThucPham = tp.maThucPham
      WHERE (dh.maKhachHang = ?) ${orderId.length > 0 ? `AND dh.maDonHang = '${orderId}'` : ''}
      GROUP BY maDonHang
      LIMIT ? 
      OFFSET ?
    `, [userId, limit, offset]);

      const [total] = await pool.query(`
      SELECT COUNT(maDonHang) as total
      FROM donhang AS dh
      WHERE (dh.maKhachHang = ?) ${orderId.length > 0 ? `AND dh.maDonHang = '${orderId}'` : ''}
      `, [userId]);
      return {
        data: rows,
        total,
      };
    } catch (error) {
      console.error('Model error:', error);
      throw error;
    }
  };
}
