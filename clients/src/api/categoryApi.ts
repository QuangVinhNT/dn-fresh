import { CategorySelectBox } from "@/types/Category";
import axiosInstance from "./axiosInstance";

const getCategories = async (page: number, limit: number) => {
  const res = await axiosInstance.get(`/v1/categories?page=${page}&limit=${limit}`)
  return res.data;
}

const getCategoriesForSelectBox = async (): Promise<CategorySelectBox[]> => {
  const res = await axiosInstance.get('/v1/categories/select-box');
  return res.data;
};

export {
  getCategoriesForSelectBox, getCategories
}
