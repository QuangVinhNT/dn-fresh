import { PoolConnection } from "mysql2/promise";
import { pool } from "../configs/database.js";

const getAllFavouriteProduct = async (page: number, limit: number, userId: string) => {
  const offset = (page - 1) * limit;
  try {
    const [rows] = await pool.query(`
      SELECT fp.maThucPham, p.tenThucPham, COALESCE(JSON_ARRAYAGG(pi.hinhAnh), JSON_ARRAY()) as hinhAnh, p.donGia, p.tiLeKhuyenMai, p.trangThai
      FROM thucphamyeuthich as fp
      LEFT JOIN khothucpham as p ON p.maThucPham = fp.maThucPham
      LEFT JOIN anhthucpham as pi ON pi.maThucPham = fp.maThucPham
      WHERE fp.maNguoiDung = ?
      GROUP BY fp.maThucPham
      ORDER BY fp.ngayTao DESC
      LIMIT ? 
      OFFSET ?
    `, [userId, limit, offset]);

    const [total] = await pool.query(`
      SELECT COUNT(maThucPham) as total
      FROM thucphamyeuthich
      WHERE maNguoiDung = ?
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

const insertFavouriteProduct = async (userId: string, productId: string, connection: PoolConnection) => {
  try {
    const [result] = await connection.query(`
      INSERT INTO thucphamyeuthich (maNguoiDung, maThucPham, ngayTao)
      VALUES (?, ?, NOW())  
    `, [userId, productId])
    return result;
  } catch (error) {
    console.error('Model error:', error);
    throw error;
  }
};

const deleteFavouriteProduct = async (userId: string, productId: string, connection: PoolConnection) => {
  try {
    const [result] = await connection.query(`
      DELETE FROM thucphamyeuthich
      WHERE (maNguoiDung = ?)  AND (maThucPham = ?)  
    `, [userId, productId])
    console.log(`DELETE FROM thucphamyeuthich WHERE (maNguoiDung = '${userId}') AND (maThucPham = '${productId}')`)
    return result;
  } catch (error) {
    console.error('Model error:', error);
    throw error;
  }
}

export {
  getAllFavouriteProduct, insertFavouriteProduct, deleteFavouriteProduct
};
