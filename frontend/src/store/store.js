import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../api/auth/authSlice";
import productReducer from "../api/product/productSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    product: productReducer,
  },
});