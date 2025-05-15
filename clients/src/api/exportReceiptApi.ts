import axiosInstance from "./axiosInstance";

const getExportReceipts = async (page: number, limit: number) => {
  const res = await axiosInstance.get(`/v1/export-receipts?page=${page}&limit=${limit}`)
  return res.data;
}

export {
  getExportReceipts
}
