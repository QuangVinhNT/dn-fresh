import { AdminProductDetail, InsertProductPayload, ProductDetail } from "@/types/Product";
import axiosInstance from "./axiosInstance";
import { OrderBy } from "@/types";

const getAdminProducts = async (page: number, limit: number) => {
  const res = await axiosInstance.get(`/v1/admin/products?page=${page}&limit=${limit}`)
  return res.data;
}

const getAdminProductById = async (id: string): Promise<AdminProductDetail> => {
  const res = await axiosInstance.get(`/v1/admin/products/${id}`)
  return res.data;
}

const insertProduct = async (payload: InsertProductPayload) => {
  const res = await axiosInstance.post(`/v1/admin/products`, payload)
  return res.data;
}

const getProducts = async (page: number, limit: number, categoryId: string, orderBy: OrderBy) => {
  const res = await axiosInstance.get(`/v1/products?page=${page}&limit=${limit}&cateid=${categoryId}&sortColumn=${orderBy.name}&sortDirection=${orderBy.value}`)
  return res.data;
}

const getProductById = async (id: string): Promise<ProductDetail> => {
  const res = await axiosInstance.get(`/v1/products/${id}`)
  return res.data;
}

export { getAdminProductById, getAdminProducts, insertProduct, getProducts, getProductById };
