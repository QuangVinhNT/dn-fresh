import { InsertOrderPayload } from "@/types/Order";
import axiosInstance from "./axiosInstance";

// Admin-side API

const getAdminOrders = async (page: number, limit: number, orderId: string, status?: string) => {
  const res = await axiosInstance.get(`/v1/admin/don-hang?page=${page}&limit=${limit}&search=${orderId}&status=${status}`);
  return res.data;
};

const getAdminOrderById = async (orderId: string) => {
  const res = await axiosInstance.get(`v1/admin/don-hang/${orderId}`);
  return res.data;
};

// Client-side API

const getOrders = async (page: number, limit: number, userId: string, orderId: string) => {
  const res = await axiosInstance.get(`/v1/don-hang?page=${page}&limit=${limit}&userId=${userId}&search=${orderId}`);
  return res.data;
};

const getOrderById = async (orderId: string) => {
  const res = await axiosInstance.get(`/v1/don-hang/${orderId}`);
  return res.data;
};

const insertOrder = async (payload: InsertOrderPayload) => {
  const res = await axiosInstance.post(`/v1/don-hang`, payload);
  return res.data;
};

export {
  getAdminOrders, getOrders, getOrderById, insertOrder, getAdminOrderById
};
