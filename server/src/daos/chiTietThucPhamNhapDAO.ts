import { pool } from "../configs/database.js";

export class ChiTietThucPhamNhapDAO {
  public getById = async (productId: string) => {
    try {
      const [rows] = await pool.query(`
        SELECT cttp.maLoHang, (cttp.soLuong - IFNULL(ctpx.soLuong, 0)) as soLuongTonKho, tp.donViTinh, hanSuDung, tenNhaCungCap as nhaCungCap
        FROM chitietthucphamnhap AS cttp
        JOIN khothucpham AS tp ON tp.maThucPham = cttp.maThucPham
        LEFT JOIN chitietphieuxuat AS ctpx ON cttp.maLoHang = ctpx.maLoHang
        JOIN phieunhap AS pn ON pn.maPhieuNhap = cttp.maPhieuNhap
        JOIN nhaCungCap AS ncc ON ncc.maNhaCungCap = pn.maNhaCungCap
        WHERE cttp.maThucPham = ?
      `, [productId]);
      return rows;
    } catch (error) {
      console.error('DAO error:', error);
      throw error;
    }
  };
}
