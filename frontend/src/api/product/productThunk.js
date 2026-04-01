import { createAsyncThunk } from "@reduxjs/toolkit";
import { getProductsAPI, getSingleProductAPI } from "./productAPI";

export const fetchProducts = createAsyncThunk(
  "product/fetchProducts",
  async ({ page = 1, limit = 8, category = "" }, { rejectWithValue }) => {
    try {
      const response = await getProductsAPI(page, limit, category);
      return response;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch products"
      );
    }
  }
);

export const fetchSingleProduct = createAsyncThunk(
  "product/fetchSingleProduct",
  async (productId, { rejectWithValue }) => {
    try {
      const response = await getSingleProductAPI(productId);
      return response.product;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch single product"
      );
    }
  }
);
