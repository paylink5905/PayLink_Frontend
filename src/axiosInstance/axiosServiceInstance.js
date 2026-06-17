import axios from "axios";

const axiosServiceInstance = axios.create({
  baseURL: "/api/services",
  withCredentials: true,
});

axiosServiceInstance.interceptors.request.use((config) => {
  const token = localStorage.getItem("accessToken");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default axiosServiceInstance;
