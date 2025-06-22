import { InsertExportReceiptPayload, InsertProductToExportReceiptPayload, UpdateExportReceiptPayload } from "@/types/ExportReceipt";
import axiosInstance from "./axiosInstance";

const getExportReceipts = async (page: number, limit: number, search: string, status?: string) => {
  const res = await axiosInstance.get(`/v1/phieu-xuat?page=${page}&limit=${limit}&search=${search}&status=${status}`);
  return res.data;
};

const getExportReceiptById = async (exportReceiptId: string) => {
  const res = await axiosInstance.get(`/v1/phieu-xuat/${exportReceiptId}`);
  return res.data;
};

const insertExportReceipt = async (payload: InsertExportReceiptPayload) => {
  const res = await axiosInstance.post(`/v1/phieu-xuat`, payload);
  return res.data;
};

const insertProductToExportReceipt = async (exportReceiptId: string, payload: InsertProductToExportReceiptPayload) => {
  const res = await axiosInstance.post(`/v1/phieu-xuat/thuc-pham/${exportReceiptId}`, payload);
  return res.data;
};

const updateExportReceipt = async (payload: UpdateExportReceiptPayload, exportReceiptId: string) => {
  const res = await axiosInstance.put(`/v1/phieu-xuat/${exportReceiptId}`, payload);
  return res.data;
};

const softDeleteExportReceipt = async (exportReceiptId: string, adminId: string) => {
  const res = await axiosInstance.patch(`/v1/phieu-xuat/${exportReceiptId}/cancel`, { adminId });
  return res.data;
};

const approveExportReceipt = async (exportReceiptId: string, adminId: string) => {
  const res = await axiosInstance.patch(`/v1/phieu-xuat/${exportReceiptId}/approve`, {adminId});
  return res.data;
};

const requestApproveExportReceipt = async (exportReceiptId: string, staffId: string) => {
  const res = await axiosInstance.patch(`/v1/phieu-xuat/${exportReceiptId}/request-approve`, {maNhanVien: staffId})
  return res.data;
}

const deleteAllProductFromExportReceipt = async (exportReceiptId: string) => {
  const res = await axiosInstance.delete(`/v1/phieu-xuat/thuc-pham/${exportReceiptId}`);
  return res.data;
};

export {
  getExportReceipts, getExportReceiptById, insertExportReceipt, updateExportReceipt, softDeleteExportReceipt, approveExportReceipt, insertProductToExportReceipt, deleteAllProductFromExportReceipt, requestApproveExportReceipt
};
