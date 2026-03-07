import apiClient from "../../services/apiClient";

export const signupUser = async (data) => {
  const response = await apiClient.post("/auth/signup", data);
  return response.data;
};

export const verifyMail = async (token) => {
  const response = await apiClient.get(`/auth/verify/${token}`);
  return response.data;
}

export const resendMail = async (email) => {
  const response = await apiClient.post("/auth/resend-mail", { email });
  return response.data;
}

export const loginUser = async (data) => {
  const response = await apiClient.post("/auth/login", data);
  return response.data;
}