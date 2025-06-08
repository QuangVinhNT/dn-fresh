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

  public getAllByProviderId = async (providerId: string) => {
    try {
      const [rows] = await pool.query(`
        SELECT cttp.maThucPham, tenThucPham, SUM(cttp.soLuong) as tongSoLuong
        FROM chitietthucphamnhap AS cttp
        JOIN phieunhap AS pn ON pn.maPhieuNhap = cttp.maPhieuNhap
        JOIN khothucpham as tp ON tp.maThucPham = cttp.maThucPham
        WHERE pn.maNhaCungCap = ?
        GROUP BY cttp.maThucPham;
        `, [providerId]);
      return rows;
    } catch (error) {
      console.error('DAO error:', error);
      throw error;
    }
  };

  public getAllByImportReceiptId = async (importReceiptId: string) => {
    try {
      const [rows] = await pool.query(`
        SELECT maLoHang, ct.maThucPham, tenThucPham, ngaySanXuat, hanSuDung, donGiaNhap, soLuong, donViTinh
        FROM chitietthucphamnhap AS ct
        JOIN khothucpham AS tp ON ct.maThucPham = tp.maThucPham
        WHERE maPhieuNhap = ?
        `, [importReceiptId]);
      return rows;
    } catch (error) {
      console.error('DAO error:', error);
      throw error;
    }
  };
}
