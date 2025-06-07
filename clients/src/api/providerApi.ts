import { InsertProviderPayload, UpdateProviderPayload } from "@/types/Provider";
import axiosInstance from "./axiosInstance";

const getProviders = async (page: number, limit: number, providerName: string, status?: string) => {
  const res = await axiosInstance.get(`/v1/admin/nha-cung-cap?page=${page}&limit=${limit}&search=${providerName}&status=${status}`);
  return res.data;
};

const insertProvider = async (payload: InsertProviderPayload) => {
  const res = await axiosInstance.post(`/v1/admin/nha-cung-cap`, payload);
  return res.data;
};

const getProviderById = async (providerId: string) => {
  const res = await axiosInstance.get(`/v1/admin/nha-cung-cap/${providerId}`);
  return res.data;
};

const deleteProvider = async (providerId: string) => {
  const res = await axiosInstance.delete(`/v1/admin/nha-cung-cap/${providerId}`);
  return res.data;
};

const updateProvider = async (providerId: string, payload: UpdateProviderPayload) => {
  const res = await axiosInstance.put(`/v1/admin/nha-cung-cap/${providerId}`, payload)
  return res.data;
}

export { getProviders, insertProvider, getProviderById, deleteProvider, updateProvider };

