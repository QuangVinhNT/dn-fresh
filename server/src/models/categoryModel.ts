import { pool } from "../configs/database.js";

interface Category {
  id: string;
  name: string;
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
  Category,
  getCategoriesForSelectBox
}
