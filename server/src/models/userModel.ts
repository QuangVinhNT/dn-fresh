import { pool } from "../configs/database.js";

interface CustomerDTO {
  id: string;
  fullname: string;
  dob: string;
  gender: number;
  email: string;
  status: number;
  createdAt: string;
}

const getAllCustomer = async (page: number, limit: number) => {
  const offset = (page - 1) * limit;
  try {
    const [rows] = await pool.query(`
      SELECT nguoidung.maNguoiDung, hoTen, ngaySinh, gioiTinh, email, trangThai, ngayTao
      FROM nguoidung
      INNER JOIN vaitronguoidung ON nguoidung.maNguoiDung = vaitronguoidung.maNguoiDung
      WHERE maVaiTro = 'VT004'
      LIMIT ?
      OFFSET ?
      `, [limit, offset]);
    const total = await pool.query(`
      SELECT COUNT(nguoidung.maNguoiDung) as total
      FROM nguoidung
      INNER JOIN vaitronguoidung ON nguoidung.maNguoiDung = vaitronguoidung.maNguoiDung
      WHERE maVaiTro = 'VT004'
      `);
    return {
      data: rows,
      total
    };
  } catch (error) {
    console.error(`Model error: ${error}`);
    throw error;
  }
};

export {
  CustomerDTO,
  getAllCustomer
}
