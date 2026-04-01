import apiClient from "../../services/apiClient";

export const getProductsAPI = async (page = 1, limit = 8, category = "") => {
  const url = `/product/all-products?page=${page}&limit=${limit}${category ? `&category=${encodeURIComponent(category)}` : ""}`;
  const response = await apiClient.get(url);
  return response.data;
};

export const getSingleProductAPI = async (productId) => {
  const response = await apiClient.get(`/product/get-product?productid=${productId}`);
  return response.data;
};