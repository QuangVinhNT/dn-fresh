import { InsertOrderPayload } from "@/types/Order";
import axiosInstance from "./axiosInstance";

const paymentVnPay = async (payload: InsertOrderPayload) => {
  const res = await axiosInstance.post('/vnpay', payload);
  return res.data;
};

export {
  paymentVnPay
};
