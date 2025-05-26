import { PoolConnection } from "mysql2/promise";
import { pool } from "../configs/database.js";

interface AdminProductsDTO {
  id: string;
  name: string;
  imageUrls: string[];
  category: string;
  quantity: string;
  unit: string;
  createdAt: string;
  status: number;
}

interface ProductsDTO {
  id: string;
  name: string;
  imageUrls: string[];
  price: number;
  discountRate: number;
  status: number;
}

interface AdminProductDTO {
  id: string;
  name: string;
  imageUrls: string[];
  price: number;
  quantity: number;
  unit: string;
  category: string;
  categoryId: string;
  createdAt?: string;
  updatedAt?: string;
  description: string;
  status: string;
  discountRate: number;
}

interface ProductDTO {
  id: string;
  name: string;
  price: string;
  quantity: string;
  unit: string;
  description: string;
  imageUrls: string[];
  status: number;
  discountRate: number;
}

const getAllAdminProduct = async (page: number, limit: number) => {
  // COALESCE: Trả về giá trị không phải NULL đầu tiên trong danh sách các tham số được cung cấp.
  // JSON_ARRAYAGG: Gộp các giá trị (hoặc đối tượng JSON) thành một mảng JSON.
  // JSON_OBJECT: Tạo một đối tượng JSON từ các cặp key-value.
  // JSON_ARRAY: Tạo một mảng JSON chứa các giá trị được chỉ định (không truyền tham số --> mảng rỗng).
  const offset = (page - 1) * limit;
  try {
    const [rows] = await pool.query(`
      SELECT p.maThucPham, tenThucPham, tenDanhMuc, soLuongTonKho, donViTinh, p.ngayTao, COALESCE(JSON_ARRAYAGG(pi.hinhAnh), JSON_ARRAY()) as hinhAnh, p.trangThai 
        FROM khothucpham as p
        INNER JOIN danhmuc as c on p.maDanhMuc = c.maDanhMuc
        LEFT JOIN anhthucpham as pi on pi.maThucPham = p.maThucPham
        GROUP BY p.maThucPham
        ORDER BY p.ngayTao DESC
        LIMIT ? OFFSET ?
    `, [limit, offset]);

    const [total] = await pool.query(`
      SELECT COUNT(maThucPham) as total
      FROM khothucpham
      `);
    return {
      data: rows,
      total,
    };
  } catch (error) {
    console.error('Model error:', error);
    throw error;
  }
};

const getAdminProductById = async (id: string) => {
  try {
    const [rows] = await pool.query(`
      SELECT p.maThucPham, tenThucPham, donGia, soLuongTonKho, donViTinh, tenDanhMuc, p.ngayTao, p.ngayCapNhat, p.moTa, COALESCE(JSON_ARRAYAGG(pi.hinhAnh), JSON_ARRAY()) as hinhAnh, p.maDanhMuc, p.trangThai, p.tiLeKhuyenMai
        FROM khothucpham as p
        INNER JOIN danhmuc as c on p.maDanhMuc = c.maDanhMuc
        LEFT JOIN anhthucpham as pi on pi.maThucPham = p.maThucPham
        WHERE p.maThucPham = ?
      `, [id]);
    return rows;
  } catch (error) {
    console.error('Model error:', error);
    throw error;
  }
};

const insertProduct = async (id: string, name: string, price: number, unit: string, description: string, categoryId: string, connection: PoolConnection) => {
  try {
    const [result] = await connection.query(`
      INSERT INTO khothucpham (maThucPham, tenThucPham, donGia, moTa, trangThai, maDanhMuc, tiLeKhuyenMai, ngayTao, ngayCapNhat, soLuongTonKho, donViTinh)
      VALUES (?, ?, ?, ?, 2, ?, 0, NOW(), NOW(), 0, ?)
      `, [id, name, price, description, categoryId, unit]);
    return result;
  } catch (error) {
    console.error('Model error:', error);
  }
};

const updateProduct = async (id: string, name: string, price: number, unit: string, description: string, categoryId: string, status: number, discountRate: number, connection: PoolConnection) => {
  try {
    const [result] = await connection.query(`
      UPDATE khothucpham
      SET tenThucPham = ?, donGia = ?, moTa = ?, trangThai = ?, maDanhMuc = ?, tiLeKhuyenMai = ?, ngayCapNhat = NOW(), donViTinh = ?
      WHERE maThucPham = ?
      `, [name, price, description, status, categoryId, discountRate, unit, id]);
    return result;
  } catch (error) {
    console.error('Model error:', error);
  }
};

const deleteProduct = async (id: string) => {
  try {
    const [result] = await pool.query(`
      DELETE FROM khothucpham
      WHERE maThucPham = ?
      `, [id]);
    return result;
  } catch (error) {
    console.error('Model error:', error);
  }
};

const getAllProduct = async (page: number, limit: number, categoryId: string, orderBy: { name: string, value: string; }, name: string) => {
  const offset = (page - 1) * limit;
  try {
    const [rows] = await pool.query(`
      SELECT p.maThucPham, tenThucPham, COALESCE(JSON_ARRAYAGG(pi.hinhAnh), JSON_ARRAY()) as hinhAnh, donGia, tiLeKhuyenMai, p.trangThai
      FROM khothucpham as p
      LEFT JOIN anhthucpham as pi on pi.maThucPham = p.maThucPham
      ${categoryId.length > 0 ? `WHERE maDanhMuc = '${categoryId}'` : ''}
      ${name.length > 0 ? `WHERE BINARY LOWER(tenThucPham) LIKE LOWER('%${name}%')` : ''}
      GROUP BY p.maThucPham
      ${orderBy.name.length > 0 ? `ORDER BY ${orderBy.name} ${orderBy.value}` : ''}
      LIMIT ? 
      OFFSET ?
    `, [limit, offset]);

    const [total] = await pool.query(`
      SELECT COUNT(maThucPham) as total
      FROM khothucpham
      ${categoryId.length > 0 ? `WHERE maDanhMuc = '${categoryId}'` : ''}
      `);
    return {
      data: rows,
      total,
    };
  } catch (error) {
    console.error('Model error:', error);
    throw error;
  }
};

const getProductById = async (id: string) => {
  try {
    const [rows] = await pool.query(`
      SELECT p.maThucPham, tenThucPham, donGia, soLuongTonKho, donViTinh, p.moTa, COALESCE(JSON_ARRAYAGG(pi.hinhAnh), JSON_ARRAY()) as hinhAnh, p.trangThai, p.tiLeKhuyenMai
      FROM khothucpham as p
      LEFT JOIN anhthucpham as pi on pi.maThucPham = p.maThucPham
      WHERE p.maThucPham = ?
      GROUP BY maThucPham
      `, [id]);
    return rows;
  } catch (error) {
    console.error('Model error:', error);
    throw error;
  }
};

const getAllDiscountProduct = async () => {
  try {
    const [rows] = await pool.query(`
      SELECT p.maThucPham, tenThucPham, COALESCE(JSON_ARRAYAGG(pi.hinhAnh), JSON_ARRAY()) as hinhAnh, donGia, tiLeKhuyenMai, p.trangThai
      FROM khothucpham as p
      LEFT JOIN anhthucpham as pi on pi.maThucPham = p.maThucPham
      WHERE tiLeKhuyenMai > 0
      GROUP BY p.maThucPham
      ORDER BY tiLeKhuyenMai DESC
      LIMIT 5
      `);
    return rows;
  } catch (error) {
    console.error('Model error:', error);
    throw error;
  }
}

export { AdminProductDTO, AdminProductsDTO, ProductsDTO, ProductDTO, getAdminProductById, getAllAdminProduct, getAllProduct, insertProduct, updateProduct, deleteProduct, getProductById, getAllDiscountProduct };

