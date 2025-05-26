import axiosInstance from "./axiosInstance";

const getFavouriteProducts = async (page: number, limit: number, userId: string) => {
  const res = await axiosInstance.get(`/v1/thuc-pham-yeu-thich?page=${page}&limit=${limit}&userid=${userId}`);
  return res.data;
};

const insertFavouriteProduct = async (payload: {productId: string, userId: string}) => {
  const res = await axiosInstance.post(`/v1/thuc-pham-yeu-thich`, payload);
  return res.data;
}

const deleteFavouriteProduct = async (productId: string, userId: string) => {
  const res = await axiosInstance.delete(`/v1/thuc-pham-yeu-thich`, {
    params: {productId, userId}
  });
  return res.data;
}

export {
  getFavouriteProducts, insertFavouriteProduct, deleteFavouriteProduct
};
