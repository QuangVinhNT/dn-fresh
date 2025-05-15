import { RowDataPacket } from "mysql2";
import * as CategoryModel from '../models/categoryModel.js'

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
  getCategoriesForSelectBox
}
