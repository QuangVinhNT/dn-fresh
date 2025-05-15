import { PoolConnection, RowDataPacket } from "mysql2/promise";
import { v4 as uuidv4 } from 'uuid';
import { pool } from "../configs/database.js";

const generateUUID = async (length?: number, connection?: PoolConnection, tableName?: string, columnName?: string, prefix?: string): Promise<string> => {
  let id = '';
  let isUnique = false;
  if (connection) {
    while (!isUnique) {
      const originalId = `${prefix && prefix}${uuidv4().replace('-', '').toUpperCase()}`;
      id = length ? originalId.slice(0, length) : originalId;
      try {
        const rows = (await pool.query(`
          SELECT 1 FROM ${tableName} WHERE ${columnName} = ? LIMIT 1
          `, [id]) as RowDataPacket)[0];
        if (rows.length === 0) {
          isUnique = true;
        }
      } catch (error) {
        console.error('Generate UUID Error:', error);
        throw error;
      }
    }
    return id;
  }
  return length ?
    `${prefix && prefix}${uuidv4().replace('-', '').slice(0, length)}` :
    `${prefix && prefix}${uuidv4().replace('-', '')}`;
};

export default generateUUID;
