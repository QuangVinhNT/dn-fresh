import { InsertImportReceiptPayload, UpdateImportReceiptPayload } from "@/types/ImportReceipt";
import axiosInstance from "./axiosInstance";
import { InsertProductToImportReceiptPayload, UpdateProductToImportReceiptPayload } from "@/types/ImportReceiptDetail";

const getImportReceipts = async (page: number, limit: number, search: string, status?: string) => {
  const res = await axiosInstance.get(`/v1/phieu-nhap?page=${page}&limit=${limit}&search=${search}&status=${status}`);
  return res.data;
};

const getImportReceiptById = async (importReceiptId: string) => {
  const res = await axiosInstance.get(`/v1/phieu-nhap/${importReceiptId}`);
  return res.data;
};

const insertImportReceipt = async (payload: InsertImportReceiptPayload) => {
  const res = await axiosInstance.post(`/v1/phieu-nhap`, payload);
  return res.data;
};

const insertProductToImportReceipt = async (importReceiptId: string, payload: InsertProductToImportReceiptPayload) => {
  const res = await axiosInstance.post(`/v1/phieu-nhap/${importReceiptId}`, payload);
  return res.data;
};

const updateImportReceipt = async (payload: UpdateImportReceiptPayload, importReceiptId: string) => {
  const res = await axiosInstance.put(`/v1/phieu-nhap/${importReceiptId}`, payload);
  return res.data;
};

const updateImportReceiptProduct = async (payload: UpdateProductToImportReceiptPayload, productPackageId: string) => {
  const res = await axiosInstance.put(`/v1/phieu-nhap/thuc-pham/${productPackageId}`, payload);
  return res.data;
};

const softDeleteImportReceipt = async (importReceiptId: string, adminId: string) => {
  const res = await axiosInstance.patch(`/v1/phieu-nhap/${importReceiptId}/cancel`, { adminId });
  return res.data;
};

const deleteImportReceiptProduct = async (productPackageId: string) => {
  const res = await axiosInstance.delete(`v1/phieu-nhap/thuc-pham/${productPackageId}`);
  return res.data;
};

const approveImportReceipt = async (importReceiptId: string, adminId: string) => {
  const res = await axiosInstance.patch(`/v1/phieu-nhap/${importReceiptId}/approve`, adminId);
  return res.data;
};

const requestApproveImportReceipt = async (importReceiptId: string, staffId: string) => {
  const res = await axiosInstance.patch(`/v1/phieu-nhap/${importReceiptId}/request-approve`, { staffId });
  return res.data;
};


export {
  getImportReceipts, getImportReceiptById, insertImportReceipt, updateImportReceipt, softDeleteImportReceipt, approveImportReceipt, insertProductToImportReceipt, deleteImportReceiptProduct, updateImportReceiptProduct, requestApproveImportReceipt
};
