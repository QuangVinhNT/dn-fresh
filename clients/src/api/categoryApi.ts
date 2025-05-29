import { CategoryFilter, CategorySelectBox, InsertCategoryPayload } from "@/types/Category";
import axiosInstance from "./axiosInstance";

const getCategories = async (page: number, limit: number, search: string, status?: string) => {
  const res = await axiosInstance.get(`/v1/danh-muc?page=${page}&limit=${limit}&search=${search}&status=${status}`);
  return res.data;
};

const getCategoryById = async (categoryId: string) => {
  const res = await axiosInstance.get(`v1/danh-muc/${categoryId}`);
  return res.data;
};

const getCategoriesForSelectBox = async (): Promise<CategorySelectBox[]> => {
  const res = await axiosInstance.get('/v1/danh-muc/select-box');
  return res.data;
};

const getCategoriesForFilter = async (): Promise<CategoryFilter[]> => {
  const res = await axiosInstance.get('/v1/danh-muc/filter');
  return res.data;
};

const insertCategory = async (payload: InsertCategoryPayload) => {
  const res = await axiosInstance.post(`/v1/danh-muc`, payload);
  return res.data;
};

const updateCategory = async (categoryId: string, payload: InsertCategoryPayload) => {
  const res = await axiosInstance.put(`/v1/danh-muc/${categoryId}`, payload);
  return res.data;
};

const deleteCategory = async (categoryId: string) => {
  const res = await axiosInstance.delete(`/v1/danh-muc/${categoryId}`);
  return res.data;
};

export {
  getCategoriesForSelectBox, getCategories, getCategoriesForFilter, getCategoryById, insertCategory, updateCategory, deleteCategory
};
