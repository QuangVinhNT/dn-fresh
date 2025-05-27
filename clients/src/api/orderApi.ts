import axiosInstance from "./axiosInstance";

const getAdminOrders = async (page: number, limit: number) => {
  const res = await axiosInstance.get(`/v1/admin-orders?page=${page}&limit=${limit}`)
  return res.data;
}

const getOrders = async (page: number, limit: number, userId: string, orderId: string) => {
  const res = await axiosInstance.get(`/v1/don-hang?page=${page}&limit=${limit}&userId=${userId}&search=${orderId}`)
  return res.data;
}

const getOrderById = async (orderId: string) => {
  const res = await axiosInstance.get(`/v1/don-hang/${orderId}`)
  return res.data;
}

export {
  getAdminOrders, getOrders, getOrderById
}
