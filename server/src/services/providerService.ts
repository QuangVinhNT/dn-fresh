import { RowDataPacket } from "mysql2";
import * as ProviderModel from '../daos/providerModel.js'

const getAllProviderName = async () => {
  try {
    const rows = await ProviderModel.getAllProviderName() as RowDataPacket[];
    return rows.map((row): ProviderModel.AdminProviderNameDTO => ({
      id: row.maNhaCungCap,
      name: row.tenNhaCungCap,
    }));
  } catch (error) {
    console.error('Error service:', error);
    throw error;
  }
};

export {
  getAllProviderName
}
