import axiosInstance from "./axiosInstance";

const getCustomers = async (page: number, limit: number, search: string, status?: string) => {
  const res = await axiosInstance.get(`/v1/admin/nguoi-dung/khach-hang?page=${page}&limit=${limit}&search=${search}&status=${status}`);
  return res.data;
}

const getStaffs = async (page: number, limit: number, staffId: string, status?: string, roleId?: string) => {
  const res = await axiosInstance.get(`/v1/admin/nguoi-dung/nhan-vien?page=${page}&limit=${limit}&search=${staffId}&status=${status}&roleId=${roleId}`)
  return res.data;
}

export {
  getCustomers, getStaffs
}
