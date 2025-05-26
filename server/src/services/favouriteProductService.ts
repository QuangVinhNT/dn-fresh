import { RowDataPacket } from "mysql2";
import * as FavouriteProductModel from '../daos/favouriteProductModel.js';
import * as ProductModel from '../daos/productModel.js';
import { pool } from "../configs/database.js";

const getAllFavouriteProduct = async (page: number, limit: number, userId: string) => {
  try {
    const rows = await FavouriteProductModel.getAllFavouriteProduct(page, limit, userId);
    const data = (rows.data as RowDataPacket[]).map((row): ProductModel.ProductsDTO => ({
      id: row.maThucPham,
      name: row.tenThucPham,
      imageUrls: row.hinhAnh,
      price: row.donGia,
      discountRate: row.tiLeKhuyenMai,
      status: row.trangThai
    }));
    const total = rows.total as RowDataPacket[];
    return {
      data,
      total: total[0].total
    };
  } catch (error) {
    console.error('Error service:', error);
    throw error;
  }
};

const insertFavouriteProduct = async (productId: string, userId: string) => {
  const connection = await pool.getConnection();
  try {
    connection.beginTransaction();
    const result = await FavouriteProductModel.insertFavouriteProduct(userId, productId, connection);
    connection.commit();
    return result;
  } catch (error) {
    connection.rollback();
    console.error(`Error service: ${error}`);
    throw error;
  } finally {
    connection.release();
  }
};

const deleteFavouriteProduct = async (userId: string, productId: string) => {
  const connection = await pool.getConnection();
  try {
    connection.beginTransaction();
    const result = await FavouriteProductModel.deleteFavouriteProduct(userId, productId, connection);
    connection.commit();
    return result;
  } catch (error) {
    connection.rollback();
    console.error(`Error service: ${error}`);
    throw error;
  } finally {
    connection.release();
  }
};

export {
  getAllFavouriteProduct, insertFavouriteProduct, deleteFavouriteProduct
};
