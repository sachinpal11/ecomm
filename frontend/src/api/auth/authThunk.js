import { createAsyncThunk } from "@reduxjs/toolkit";
import { loginUser, signupUser } from "./authAPI";

export const signup = createAsyncThunk(
  "auth/signup",
  async (userData, thunkAPI) => {
    try {
      const response = await signupUser(userData);
      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const login = createAsyncThunk(
  "auth/login",
  async (data, thunkAPI) => {
    try {
      const res = await loginUser(data);
      return res; // important
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data);
    }
  }
);