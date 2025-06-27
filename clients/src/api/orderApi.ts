import { InsertOrderPayload } from "@/types/Order";
import axiosInstance from "./axiosInstance";

const getAdminOrders = async (page: number, limit: number, orderId: string, status?: string) => {
  const res = await axiosInstance.get(`/v1/don-hang?page=${page}&limit=${limit}&search=${orderId}&status=${status}`);
  return res.data;
};

const getAdminOrderById = async (orderId: string) => {
  const res = await axiosInstance.get(`v1/don-hang/${orderId}`);
  return res.data;
};

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

const getReadyOrders = async () => {
  const res = await axiosInstance.get(`/v1/don-hang/ready`);
  return res.data;
};

const getStaffOrders = async (page: number, limit: number, orderId: string, communeId: string, status?: string) => {
  const res = await axiosInstance.get(`/v1/don-hang?page=${page}&limit=${limit}&search=${orderId}&status=${status}&communeId=${communeId}`);
  return res.data;
};

const unpackOrders = async (exportReceiptId: string) => {
  const res = await axiosInstance.patch(`/v1/don-hang/${exportReceiptId}/unpack`);
  return res.data;
};

const confirmPackOrder = async (orderId: string, exportReceiptId: string) => {
  const res = await axiosInstance.patch(`/v1/don-hang/${orderId}/pack`, { maPhieuXuat: exportReceiptId });
  return res.data;
};

const confirmExportOrder = async (orderId: string, staffId: string) => {
  const res = await axiosInstance.patch(`/v1/don-hang/${orderId}/export`, { staffId });
  return res.data;
};

const confirmFinishOrder = async (orderId: string, staffId: string) => {
  const res = await axiosInstance.patch(`/v1/don-hang/${orderId}/finish`, { staffId });
  return res.data;
};

const confirmCancelOrder = async (orderId: string, staffId: string, note: string) => {
  const res = await axiosInstance.patch(`/v1/don-hang/${orderId}/cancel`, { staffId, note });
  return res.data;
};

export {
  getAdminOrders, getOrders, getOrderById, insertOrder, getAdminOrderById, getReadyOrders, getStaffOrders, confirmExportOrder, confirmFinishOrder, unpackOrders, confirmPackOrder, confirmCancelOrder
};
