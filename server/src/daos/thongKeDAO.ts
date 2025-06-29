import { pool } from "../configs/database.js";

export class ThongKeDAO {
  public getProfit = async () => {
    try {
      const [rows] = await pool.query(`
        SELECT ( 
          (SELECT SUM(giaTriDonHang) FROM donhang WHERE trangthai = 4)
          -
          (SELECT SUM(soLuong * donGiaNhap) FROM chitietthucphamnhap)
        ) AS doanhThu;
        `);
      return rows;
    } catch (error) {
      console.error('DAO error:', error);
      throw error;
    }
  };

  public getProductIsAboutToExpire = async () => {
    try {
      const [rows] = await pool.query(`
        SELECT maLoHang, cttp.maThucPham, tp.tenThucPham, hanSuDung, soLuong
        FROM chitietthucphamnhap AS cttp
        JOIN khothucpham AS tp ON tp.maThucPham = cttp.maThucPham
        WHERE (DATEDIFF(hanSuDung, NOW()) BETWEEN 0 AND 3) AND (cttp.soLuong > 0);
        `);

      const [quantity] = await pool.query(`
        SELECT COUNT(DISTINCT(maThucPham)) as soLuong
        FROM chitietthucphamnhap AS cttp
        WHERE (DATEDIFF(hanSuDung, NOW()) BETWEEN 0 AND 3) AND (cttp.soLuong > 0);
        `);
      return {
        products: rows,
        quantity
      };
    } catch (error) {
      console.error('DAO error:', error);
      throw error;
    }
  };

  public getProductHasExpired = async () => {
    try {
      const [rows] = await pool.query(`
        SELECT maLoHang, cttp.maThucPham, tp.tenThucPham, hanSuDung, soLuong
        FROM chitietthucphamnhap AS cttp
        JOIN khothucpham AS tp ON tp.maThucPham = cttp.maThucPham
        WHERE (DATEDIFF(hanSuDung, NOW()) < 0) AND (cttp.soLuong > 0);
        `);

      const [quantity] = await pool.query(`
        SELECT COUNT(DISTINCT(maThucPham)) as soLuong
        FROM chitietthucphamnhap AS cttp
        WHERE (DATEDIFF(hanSuDung, NOW()) < 0) AND (cttp.soLuong > 0);
        `);
      return {
        products: rows,
        quantity
      };
    } catch (error) {
      console.error('DAO error:', error);
      throw error;
    }
  };

  public getProductAlmostOutOfStock = async () => {
    try {
      const [rows] = await pool.query(`
        SELECT maThucPham, tenThucPham, soLuongTonKho, donViTinh
        FROM khothucpham
        WHERE soLuongTonKho > 0 AND soLuongTonKho <= 5;
        `);

      const [quantity] = await pool.query(`
        SELECT COUNT(maThucPham) as soLuong
        FROM khothucpham
        WHERE soLuongTonKho > 0 AND soLuongTonKho <= 5;
        `);
      return {
        products: rows,
        quantity
      };
    } catch (error) {
      console.error('DAO error:', error);
      throw error;
    }
  };

  public getProductOutOfStock = async () => {
    try {
      const [rows] = await pool.query(`
        SELECT maThucPham, tenThucPham, donViTinh
        FROM khothucpham
        WHERE soLuongTonKho = 0;
        `);

      const [quantity] = await pool.query(`
        SELECT COUNT(maThucPham) as soLuong
        FROM khothucpham
        WHERE soLuongTonKho = 0;
        `);
      return {
        products: rows,
        quantity
      };
    } catch (error) {
      console.error('DAO error:', error);
      throw error;
    }
  };

  public getOrderQuantityWaitingProcess = async () => {
    try {
      const [rows] = await pool.query(`
        SELECT COUNT(maDonHang) as soLuong
        FROM donhang
        WHERE trangThai = 1;
        `);
      return rows;
    } catch (error) {
      console.error('DAO error:', error);
      throw error;
    }
  };

  public getRevenueByMonth = async () => {
    try {
      const [rows] = await pool.query(`
        SELECT SUM(dh.giaTriDonHang) AS doanhThu, MONTH(ngayCapNhat) AS thang
        FROM donhang AS dh
        WHERE dh.trangThai = 4 AND YEAR(ngayCapNhat) = '2025'
        GROUP BY thang
        ORDER BY thang ASC;
        `);
      return rows;
    } catch (error) {
      console.error('DAO error:', error);
      throw error;
    }
  };

  public getOrderQuantityByMonth = async () => {
    try {
      const [rows] = await pool.query(`
        SELECT COUNT(dh.maDonHang) as soLuong, MONTH(ngayCapNhat) AS thang
        FROM donhang AS dh
        GROUP BY thang
        ORDER BY thang ASC;
        `);
      return rows;
    } catch (error) {
      console.error('DAO error:', error);
      throw error;
    }
  };

  public getOrderQuantityByStatus = async () => {
    try {
      const [cancelOrder] = await pool.query(`
        SELECT COUNT(dh.maDonHang) as soLuong
        FROM donhang AS dh
        WHERE dh.trangThai = 0;
        `);

      const [finishOrder] = await pool.query(`
        SELECT COUNT(dh.maDonHang) as soLuong
        FROM donhang AS dh
        WHERE dh.trangThai = 4;
        `);
      return {
        cancelOrder,
        finishOrder
      };
    } catch (error) {
      console.error('DAO error:', error);
      throw error;
    }
  };
}
