import { InsertExportReceiptPayload, UpdateExportReceiptPayload } from "@/types/ExportReceipt";
import axiosInstance from "./axiosInstance";

const getExportReceipts = async (page: number, limit: number, search: string, status?: string) => {
  const res = await axiosInstance.get(`/v1/admin/phieu-xuat?page=${page}&limit=${limit}&search=${search}&status=${status}`);
  return res.data;
};

const getExportReceiptById = async (exportReceiptId: string) => {
  const res = await axiosInstance.get(`/v1/admin/phieu-xuat/${exportReceiptId}`);
  return res.data;
};

const insertExportReceipt = async (payload: InsertExportReceiptPayload) => {
  const res = await axiosInstance.post(`/v1/admin/phieu-xuat`, payload);
  return res.data;
};

const updateExportReceipt = async (payload: UpdateExportReceiptPayload, exportReceiptId: string) => {
  const res = await axiosInstance.put(`/v1/admin/phieu-xuat/${exportReceiptId}`, payload);
  return res.data;
};

const softDeleteExportReceipt = async (exportReceiptId: string, adminId: string) => {
  const res = await axiosInstance.patch(`/v1/admin/phieu-xuat/${exportReceiptId}/cancel`, { adminId });
  return res.data;
};

const approveExportReceipt = async (exportReceiptId: string, adminId: string) => {
  const res = await axiosInstance.patch(`/v1/admin/phieu-xuat/${exportReceiptId}/approve`, adminId);
  return res.data;
};

export {
  getExportReceipts, getExportReceiptById, insertExportReceipt, updateExportReceipt, softDeleteExportReceipt, approveExportReceipt
};
