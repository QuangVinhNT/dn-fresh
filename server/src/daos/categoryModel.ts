import { pool } from "../configs/database.js";

interface Category {
  id: string;
  name: string;
}

interface CategoryDTO {
  id: string;
  name: string;
  status: number;
  createdAt: string;
  productQuantity: number;
}

const getAllCategory = async (page: number, limit: number) => {
  const offset = (page - 1) * limit;
  try {
    const [rows] = await pool.query(`
      SELECT danhmuc.maDanhMuc, tenDanhMuc, danhmuc.trangThai, danhmuc.ngayTao, COUNT(maThucPham) as soLuongThucPham
      FROM danhmuc
      INNER JOIN khothucpham ON danhmuc.maDanhMuc = khothucpham.maDanhMuc
      GROUP BY danhmuc.maDanhMuc
      LIMIT ?
      OFFSET ?
      `, [limit, offset]);
    const total = await pool.query(`
      SELECT COUNT(maDanhMuc) as total
      FROM danhmuc
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

const getCategoriesForSelectBox = async () => {
  try {
    const [rows] = await pool.query(`
      SELECT maDanhMuc, tenDanhMuc 
      FROM danhmuc
      WHERE trangThai = 1
      `);
    return rows;
  } catch (error) {
    console.error(`Model error: ${error}`);
  }
};

export {
  Category, CategoryDTO,
  getCategoriesForSelectBox, getAllCategory
}
