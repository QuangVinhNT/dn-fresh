import axiosInstance from "./axiosInstance";

const getImportReceipts = async (page: number, limit: number) => {
  const res = await axiosInstance.get(`/v1/import-receipts?page=${page}&limit=${limit}`)
  return res.data;
}

export {
  getImportReceipts
}
