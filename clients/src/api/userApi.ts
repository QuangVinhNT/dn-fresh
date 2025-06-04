import { InsertUserPayload, InsertUserRolePayload } from "@/types/User";
import axiosInstance from "./axiosInstance";

const getCustomers = async (page: number, limit: number, search: string, status?: string) => {
  const res = await axiosInstance.get(`/v1/admin/nguoi-dung/khach-hang?page=${page}&limit=${limit}&search=${search}&status=${status}`);
  return res.data;
};

const getStaffs = async (page: number, limit: number, staffId: string, status?: string, roleId?: string) => {
  const res = await axiosInstance.get(`/v1/admin/nguoi-dung/nhan-vien?page=${page}&limit=${limit}&search=${staffId}&status=${status}&roleId=${roleId}`);
  return res.data;
};

const getCustomerById = async (customerId: string) => {
  const res = await axiosInstance.get(`v1/admin/nguoi-dung/khach-hang/${customerId}`);
  return res.data;
};

const getStaffById = async (staffId: string) => {
  const res = await axiosInstance.get(`v1/admin/nguoi-dung/nhan-vien/${staffId}`);
  return res.data;
};

const lockAccount = async (userId: string) => {
  const res = await axiosInstance.patch(`v1/admin/nguoi-dung/${userId}/lock`);
  return res.data;
};

const unlockAccount = async (userId: string) => {
  const res = await axiosInstance.patch(`v1/admin/nguoi-dung/${userId}/unlock`);
  return res.data;
};

const insertUser = async (payload: InsertUserPayload) => {
  const res = await axiosInstance.post(`v1/admin/nguoi-dung`, payload);
  return res.data;
};

const insertUserRole = async (payload: InsertUserRolePayload) => {
  const res = await axiosInstance.post(`/vai-tro`, payload);
  return res.data;
};

const deleteAllStaffRole = async (userId: string) => {
  const res = await axiosInstance.delete(`/vai-tro/staffs/${userId}`);
  return res.data;
};

const updateRole = async (userId: string, roleId: string) => {
  const res = await axiosInstance.put(`/vai-tro/${userId}`, {maVaiTro: roleId})
  return res.data;
}

export { getCustomerById, getCustomers, getStaffs, lockAccount, unlockAccount, insertUser, insertUserRole, getStaffById, deleteAllStaffRole, updateRole };

