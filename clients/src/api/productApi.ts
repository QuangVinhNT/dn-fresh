import { OrderBy } from "@/types";
import { InsertProductPayload, ProductDetail } from "@/types/Product";
import axiosInstance from "./axiosInstance";

// Client-side API
const getProducts = async (page: number, limit: number, maThucPham: string, orderBy: OrderBy, productName: string) => {
  const res = await axiosInstance.get(`/v1/kho-thuc-pham?page=${page}&limit=${limit}&categoryId=${maThucPham}&sortColumn=${orderBy.columnName}&sortDirection=${orderBy.direction}&search=${productName}`)
  return res.data;
}

const getProductById = async (id: string): Promise<ProductDetail> => {
  const res = await axiosInstance.get(`/v1/kho-thuc-pham/${id}`)
  return res.data;
}

const getDiscountProducts = async () => {
  const res = await axiosInstance.get('/v1/kho-thuc-pham/giam-gia');
  return res.data;
}

// Admin-side API

const getAdminProducts = async (page: number, limit: number, productName: string, status?: string, category?: string) => {
  const res = await axiosInstance.get(`/v1/admin/kho-thuc-pham?page=${page}&limit=${limit}&search=${productName}&status=${status}&category=${category}`)
  return res.data;
}

const getAdminProductById = async (id: string) => {
  const res = await axiosInstance.get(`/v1/admin/kho-thuc-pham/${id}`)
  return res.data;
}

const insertProduct = async (payload: InsertProductPayload) => {
  const res = await axiosInstance.post(`/v1/admin/kho-thuc-pham`, payload)
  return res.data;
}

const updateProduct = async (id: string, payload: InsertProductPayload) => {
  const res = await axiosInstance.put(`/v1/admin/kho-thuc-pham/${id}`, payload)
  return res.data;
}

const deleteProduct = async (id: string) => {
  const res = await axiosInstance.delete(`/v1/admin/kho-thuc-pham/${id}`)
  return res.data;
}


export { deleteProduct, getAdminProductById, getAdminProducts, getDiscountProducts, getProductById, getProducts, insertProduct, updateProduct };
