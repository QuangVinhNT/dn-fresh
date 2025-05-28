import axiosInstance from "./axiosInstance";

const getImportReceipts = async (page: number, limit: number, search: string, status?: string) => {
  const res = await axiosInstance.get(`/v1/admin/phieu-nhap?page=${page}&limit=${limit}&search=${search}&status=${status}`)
  return res.data;
}

export {
  getImportReceipts
}
