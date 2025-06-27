import axiosInstance from "./axiosInstance";

const getFavouriteProducts = async (page: number, limit: number, userId: string) => {
  const res = await axiosInstance.get(`/v1/thuc-pham-yeu-thich/${userId}?page=${page}&limit=${limit}`);
  return res.data;
};

const insertFavouriteProduct = async (productId: string, userId: string) => {
  const res = await axiosInstance.post(`/v1/thuc-pham-yeu-thich/${userId}`, { productId });
  return res.data;
};

const deleteFavouriteProduct = async (productId: string, userId: string) => {
  const res = await axiosInstance.delete(`/v1/thuc-pham-yeu-thich/${userId}`, {
    params: { productId }
  });
  return res.data;
};

export {
  getFavouriteProducts, insertFavouriteProduct, deleteFavouriteProduct
};
