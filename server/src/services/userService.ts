import { RowDataPacket } from "mysql2";
import * as UserModel from '../models/userModel.js'
const getAllCustomer = async (page: number, limit: number) => {
  try {
    const rows = await UserModel.getAllCustomer(page, limit);
    const data = (rows.data as RowDataPacket[]).map((row): UserModel.CustomerDTO => ({
      id: row.maNguoiDung,
      fullname: row.hoTen,
      dob: row.ngaySinh,
      gender: row.gioiTinh,
      email: row.email,
      status: row.trangThai,
      createdAt: row.ngayTao
    }));
    const total = rows.total as RowDataPacket[];
    return {
      data,
      total: total[0].total
    };
  } catch (error) {
    console.error(`Service error: ${error}`);
    throw error;
  }
}

export {
  getAllCustomer
}
