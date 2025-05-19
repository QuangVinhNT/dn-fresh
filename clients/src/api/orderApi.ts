import axiosInstance from "./axiosInstance";

const getAdminOrders = async (page: number, limit: number) => {
  const res = await axiosInstance.get(`/v1/admin-orders?page=${page}&limit=${limit}`)
  return res.data;
}

export {
  getAdminOrders
}
