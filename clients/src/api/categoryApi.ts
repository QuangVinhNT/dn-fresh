import { CategorySelectBox } from "@/types/Category";
import axiosInstance from "./axiosInstance";

const getCategoriesForSelectBox = async (): Promise<CategorySelectBox[]> => {
  const res = await axiosInstance.get('/v1/categories/select-box');
  return res.data;
};

export {
  getCategoriesForSelectBox
}
