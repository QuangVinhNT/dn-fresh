import axiosInstance from "./axiosInstance";

const getCustomers = async (page: number, limit: number) => {
  const res = await axiosInstance.get(`/v1/users/customers?page=${page}&limit=${limit}`)
  return res.data;
}

const getStaffs = async (page: number, limit: number) => {
  const res = await axiosInstance.get(`/v1/users/staffs?page=${page}&limit=${limit}`)
  return res.data;
}

export {
  getCustomers, getStaffs
}
