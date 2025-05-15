import { createPool, Pool, PoolConnection } from 'mysql2/promise';
import dotenv from 'dotenv';

dotenv.config();

const pool: Pool = createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

const checkConnect = async (): Promise<void> => {
  try {
    const connection: PoolConnection = await pool.getConnection();
    console.log('MySQL Pool Connected!');
    connection.release();
  } catch (err: unknown) {
    console.error('Failed to connect database:', err);
  }
};

export { pool, checkConnect };
