import { AdminProductDetail, InsertProductPayload } from "@/types/Product";
import axiosInstance from "./axiosInstance";

const getAdminProducts = async (page: number, limit: number) => {
  const res = await axiosInstance.get(`/v1/admin-products?page=${page}&limit=${limit}`)
  return res.data;
}

const getAdminProductById = async (id: string): Promise<AdminProductDetail> => {
  const res = await axiosInstance.get(`/v1/admin-products/${id}`)
  return res.data;
}

const insertProduct = async (payload: InsertProductPayload) => {
  const res = await axiosInstance.post(`/v1/admin-products`, payload)
  return res.data;
}

export { getAdminProductById, getAdminProducts, insertProduct };
