import { pool } from "../configs/database.js";

interface AdminProviderNameDTO {
  id: string;
  name: string;
}

const getAllProviderName = async () => {
  try {
    const [rows] = await pool.query(`
      SELECT maNhaCungCap, tenNhaCungCap
      FROM nhacungcap
    `);
    return rows;
  } catch (error) {
    console.error('Admin provider name error:', error);
    throw error;
  }
};

export {
  AdminProviderNameDTO,

  getAllProviderName
}
