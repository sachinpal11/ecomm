import axios from "axios";

const apiClient = axios.create({
  baseURL: `${import.meta.env.BACKEND_URL}/api`,
  withCredentials: true,
});

export default apiClient;