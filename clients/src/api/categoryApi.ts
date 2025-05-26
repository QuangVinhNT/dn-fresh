import { CategoryFilter, CategorySelectBox } from "@/types/Category";
import axiosInstance from "./axiosInstance";

const getCategories = async (page: number, limit: number) => {
  const res = await axiosInstance.get(`/v1/categories?page=${page}&limit=${limit}`)
  return res.data;
}

const getCategoriesForSelectBox = async (): Promise<CategorySelectBox[]> => {
  const res = await axiosInstance.get('/v1/categories/select-box');
  return res.data;
};

const getCategoriesForFilter = async (): Promise<CategoryFilter[]> => {
  const res = await axiosInstance.get('/v1/danh-muc/filter');
  return res.data;
}

export {
  getCategoriesForSelectBox, getCategories, getCategoriesForFilter
}
