import { PhuongXa, TinhThanhPho } from "@/types/Address";
import axiosInstance from "./axiosInstance";

const getCities = async (): Promise<TinhThanhPho[]> => {
  const res = await axiosInstance.get('/dia-chi/tinh-thanhpho');
  return res.data;
}

const getCommunes = async(cityId: string): Promise<PhuongXa[]> => {
  const res = await axiosInstance.get(`/dia-chi/phuong-xa?cityId=${cityId}`)
  return res.data;
}

export {
  getCities, getCommunes
}
