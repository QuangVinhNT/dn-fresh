import { InsertImportReceiptPayload, UpdateImportReceiptPayload } from "@/types/ImportReceipt";
import axiosInstance from "./axiosInstance";

const getImportReceipts = async (page: number, limit: number, search: string, status?: string) => {
  const res = await axiosInstance.get(`/v1/admin/phieu-nhap?page=${page}&limit=${limit}&search=${search}&status=${status}`);
  return res.data;
};

const getImportReceiptById = async (importReceiptId: string) => {
  const res = await axiosInstance.get(`/v1/admin/phieu-nhap/${importReceiptId}`);
  return res.data;
};

const insertImportReceipt = async (payload: InsertImportReceiptPayload) => {
  const res = await axiosInstance.post(`/v1/admin/phieu-nhap`, payload);
  return res.data;
};

const updateImportReceipt = async (payload: UpdateImportReceiptPayload, importReceiptId: string) => {
  const res = await axiosInstance.put(`/v1/admin/phieu-nhap/${importReceiptId}`, payload);
  return res.data;
};

const softDeleteImportReceipt = async (importReceiptId: string, adminId: string) => {
  const res = await axiosInstance.patch(`/v1/admin/phieu-nhap/${importReceiptId}/cancel`, {adminId});
  return res.data;
};

const approveImportReceipt = async (importReceiptId: string, adminId: string) => {
  const res = await axiosInstance.patch(`/v1/admin/phieu-nhap/${importReceiptId}/approve`, adminId);
  return res.data;
};


export {
  getImportReceipts, getImportReceiptById, insertImportReceipt, updateImportReceipt, softDeleteImportReceipt, approveImportReceipt
};
