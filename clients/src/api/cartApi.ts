import { InsertCartPayload, UpdateCartPayload } from "@/types/Cart";
import axiosInstance from "./axiosInstance";

const getCart = async (userId: string) => {
  const res = await axiosInstance.get(`/v1/gio-hang/${userId}`);
  return res.data;
};

const insertItemToCart = async (userId: string, payload: InsertCartPayload) => {
  const res = await axiosInstance.post(`/v1/gio-hang/${userId}`, payload);
  return res.data;
};

const updateItemFromCart = async (userId: string, payload: UpdateCartPayload) => {
  const res = await axiosInstance.put(`/v1/gio-hang/${userId}`, payload);
  return res.data;
};

const deleteCart = async (userId: string, maThucPham?: string) => {
  const res = await axiosInstance.delete(`/v1/gio-hang/${userId}`, {
    params: { maThucPham }
  });
  return res.data;
};

export {
  getCart, insertItemToCart, updateItemFromCart, deleteCart
};
