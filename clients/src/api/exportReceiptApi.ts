import axiosInstance from "./axiosInstance";

const getExportReceipts = async (page: number, limit: number, search: string, status?: string) => {
  const res = await axiosInstance.get(`/v1/admin/phieu-xuat?page=${page}&limit=${limit}&search=${search}&status=${status}`)
  return res.data;
}

export {
  getExportReceipts
}
