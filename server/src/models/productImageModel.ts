import { PoolConnection } from "mysql2/promise";

const insertProductImage = async (id: string, productId: string, imageUrl: string, connection: PoolConnection) => {
  try {
    const [result] = await connection.query(`
      INSERT INTO anhthucpham (maAnh, maThucPham, hinhAnh)
      VALUES (?, ?, ?)
      `, [id, productId, imageUrl]);
    return result;
  } catch (error) {
    console.error(`Model error: ${error}`);
    throw error;
  }
};

const updateProductImage = async (id: string, productId: string, imageUrl: string, connection: PoolConnection) => {
  
}

export {
  insertProductImage
};

