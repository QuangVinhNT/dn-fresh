import { AdminProviderName } from "@/types/Provider";
import axiosInstance from "./axiosInstance";

const getProvidersName = async (): Promise<AdminProviderName[]> => {
  const res = await axiosInstance.get('/v1/admin-providers/names');
  return res.data;
};

export {
  getProvidersName
}
