import { QueryResult, RowDataPacket } from "mysql2";
import * as ProductModel from '../models/productModel.js';
import * as ProductImageModel from '../models/productImageModel.js';
import { pool } from "../configs/database.js";
import generateUUID from "../utils/generateUUID.js";

const getAllAdminProduct = async (page: number, limit: number) => {
  try {
    const rows = await ProductModel.getAllAdminProduct(page, limit);
    const data = (rows.data as RowDataPacket[]).map((row): ProductModel.AdminProductsDTO => ({
      id: row.maThucPham,
      name: row.tenThucPham,
      category: row.tenDanhMuc,
      quantity: row.soLuongTonKho,
      unit: row.donViTinh,
      createdAt: row.ngayTao,
      imageUrls: row.hinhAnh,
      status: row.trangThai,
    }));
    const total = rows.total as RowDataPacket[]
    return {
      data,
      total: total[0].total
    }
  } catch (error) {
    console.error('Error service:', error);
    throw error;
  }
};

const getAdminProductById = async (id: string): Promise<ProductModel.AdminProductDTO> => {
  try {
    const rows = (await ProductModel.getAdminProductById(id) as RowDataPacket)[0];
    const product: ProductModel.AdminProductDTO = {
      id: rows.maThucPham,
      name: rows.tenThucPham,
      imageUrls: rows.hinhAnh,
      price: rows.donGia,
      quantity: rows.soLuongTonKho,
      unit: rows.donViTinh,
      category: rows.tenDanhMuc,
      createdAt: rows.ngayTao,
      updatedAt: rows.ngayCapNhat,
      description: rows.moTa,
      categoryId: rows.maDanhMuc,
      status: rows.trangThai,
      discountRate: rows.tiLeKhuyenMai
    };
    return product;
  } catch (error) {
    console.error('Error service:', error);
    throw error;
  }
};

const insertProduct = async (name: string, price: number, unit: string, description: string, categoryId: string, imageUrls: string[]) => {
  const connection = await pool.getConnection();
  try {
    connection.beginTransaction();
    const productId = await generateUUID(10, connection, 'khothucpham', 'maThucPham', 'TP');
    const productResult = await ProductModel.insertProduct(productId, name, price, unit, description, categoryId, connection);

    const imageResult = await Promise.all(
      imageUrls.map(async (imageUrl) => {
        const imageId = await generateUUID(undefined, connection, 'anhthucpham', 'maAnh', 'IMG');
        return ProductImageModel.insertProductImage(imageId, productId, imageUrl, connection);
      })
    );
    connection.commit();
    return { result: { productResult, imageResult } };
  } catch (error) {
    connection.rollback();
    console.error(`Error service: ${error}`);
    throw error;
  } finally {
    connection.release();
  }
};

// const updateProduct = async ()

export {
  getAllAdminProduct, getAdminProductById, insertProduct
};
