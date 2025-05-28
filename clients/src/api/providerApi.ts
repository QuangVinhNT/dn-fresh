import { AdminProviderName } from "@/types/Provider";
import axiosInstance from "./axiosInstance";

const getProvidersName = async (): Promise<AdminProviderName[]> => {
  const res = await axiosInstance.get('/v1/admin-providers/names');
  return res.data;
};

const getProviders = async (page: number, limit: number, providerName: string, status?: string) => {
  const res = await axiosInstance.get(`/v1/admin/nha-cung-cap?page=${page}&limit=${limit}&search=${providerName}&status=${status}`);
  return res.data;
}

export {
  getProvidersName, getProviders
}
