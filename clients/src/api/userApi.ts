import { InsertUserPayload, InsertUserRolePayload, UpdateUserPayload } from "@/types/User";
import axiosInstance from "./axiosInstance";

const getCustomers = async (page: number, limit: number, search: string, status?: string) => {
  const res = await axiosInstance.get(`/v1/nguoi-dung/khach-hang?page=${page}&limit=${limit}&search=${search}&status=${status}`);
  return res.data;
};

const getStaffs = async (page: number, limit: number, staffId: string, status?: string, roleId?: string) => {
  const res = await axiosInstance.get(`/v1/nguoi-dung/nhan-vien?page=${page}&limit=${limit}&search=${staffId}&status=${status}&roleId=${roleId}`);
  return res.data;
};

const getCustomerById = async (customerId: string) => {
  const res = await axiosInstance.get(`/v1/nguoi-dung/khach-hang/${customerId}`);
  return res.data;
};

const getStaffById = async (staffId: string) => {
  const res = await axiosInstance.get(`/v1/nguoi-dung/nhan-vien/${staffId}`);
  return res.data;
};

const getUserById = async (userId: string) => {
  const res = await axiosInstance.get(`/v1/nguoi-dung/${userId}`);
  return res.data;
};

const getUserRolesByUserId = async (userId: string) => {
  const res = await axiosInstance.get(`/vai-tro/nguoi-dung/${userId}`);
  return res.data;
};

const checkEmailExist = async (email: string) => {
  const res = await axiosInstance.post(`/v1/nguoi-dung/forgot-password`, { email });
  return res.data;
};

const verifyAndResetPassword = async (payload: { email: string, code: string, token: string, newPassword: string; }) => {
  const res = await axiosInstance.post(`/v1/nguoi-dung/forgot-password/reset`, payload);
  return res.data;
};

const lockAccount = async (userId: string) => {
  const res = await axiosInstance.patch(`/v1/nguoi-dung/${userId}/lock`);
  return res.data;
};

const unlockAccount = async (userId: string) => {
  const res = await axiosInstance.patch(`/v1/nguoi-dung/${userId}/unlock`);
  return res.data;
};

const insertUser = async (payload: InsertUserPayload) => {
  const res = await axiosInstance.post(`/v1/nguoi-dung`, payload);
  return res.data;
};

const updateUser = async (userId: string, payload: UpdateUserPayload) => {
  const res = await axiosInstance.put(`/v1/nguoi-dung/${userId}`, payload);
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
  const res = await axiosInstance.put(`/vai-tro/${userId}`, { maVaiTro: roleId });
  return res.data;
};

const login = async (payload: { email: string, password: string; }) => {
  const res = await axiosInstance.post(`/v1/nguoi-dung/login`, payload);
  return res.data;
};

const getRoleToken = async (payload: { userId: string, roleId: string; }) => {
  const res = await axiosInstance.post(`/v1/nguoi-dung/get-role-token`, payload);
  return res.data;
};

const registerUser = async (payload: InsertUserPayload) => {
  const res = await axiosInstance.post(`/v1/nguoi-dung/register`, payload);
  return res.data;
};

const verifyEmail = async (payload: { email: string, code: string, token: string; }) => {
  const res = await axiosInstance.post(`/v1/nguoi-dung/verify-email`, payload);
  return res.data;
};

export { getCustomerById, getCustomers, getStaffs, lockAccount, unlockAccount, insertUser, insertUserRole, getStaffById, deleteAllStaffRole, updateRole, login, getRoleToken, registerUser, verifyEmail, getUserById, updateUser, checkEmailExist, verifyAndResetPassword, getUserRolesByUserId };

