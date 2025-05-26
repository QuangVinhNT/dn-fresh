import { RowDataPacket } from "mysql2";
import * as CategoryModel from '../daos/categoryModel.js'

const getAllCategory = async (page: number, limit: number) => {
  try {
      const rows = await CategoryModel.getAllCategory(page, limit);
      const data = (rows.data as RowDataPacket[]).map((row): CategoryModel.CategoryDTO => ({
        id: row.maDanhMuc,
        name: row.tenDanhMuc,
        status: row.trangThai,
        createdAt: row.ngayTao,
        productQuantity: row.soLuongThucPham
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

const getCategoriesForSelectBox = async () => {
  try {
    const rows = await CategoryModel.getCategoriesForSelectBox() as RowDataPacket[];
    return rows.map((row): CategoryModel.Category => ({
      id: row.maDanhMuc,
      name: row.tenDanhMuc,
    }))
  } catch (error) {
    console.error(`Service error: ${error}`)
  }
}

export {
  getCategoriesForSelectBox, getAllCategory
}
