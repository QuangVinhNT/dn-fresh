import axiosInstance from "./axiosInstance";

const getProfit = async () => {
  const res = await axiosInstance.get(`/thong-ke/loi-nhuan`);
  return res.data;
};

const getProductIsAboutToExpire = async () => {
  const res = await axiosInstance.get(`/thong-ke/sap-het-han`);
  return res.data;
};

const getProductHasExpired = async () => {
  const res = await axiosInstance.get(`/thong-ke/het-han`);
  return res.data;
};

const getProductAlmostOutOfStock = async () => {
  const res = await axiosInstance.get(`/thong-ke/sap-het-hang`);
  return res.data;
};

const getProductOutOfStock = async () => {
  const res = await axiosInstance.get(`/thong-ke/het-hang`);
  return res.data;
};

const getOrderQuantityWaitingProcess = async () => {
  const res = await axiosInstance.get(`/thong-ke/don-hang/doi-xu-ly`);
  return res.data;
};

const getRevenueByMonth = async () => {
  const res = await axiosInstance.get(`/thong-ke/doanh-thu-theo-thang`);
  return res.data;
};

const getOrderQuantityByMonth = async () => {
  const res = await axiosInstance.get(`/thong-ke/don-hang-theo-thang`);
  return res.data;
};

const getOrderQuantityByStatus = async () => {
  const res = await axiosInstance.get(`/thong-ke/don-hang-theo-trang-thai`);
  return res.data;
};

export {
  getProfit, getProductAlmostOutOfStock, getProductHasExpired, getOrderQuantityWaitingProcess, getProductIsAboutToExpire, getProductOutOfStock, getRevenueByMonth, getOrderQuantityByMonth, getOrderQuantityByStatus
};
