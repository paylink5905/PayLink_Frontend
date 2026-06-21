import axios from "axios";

const axiosServiceInstance = axios.create({
  baseURL: `${import.meta.env.VITE_API_URL}/api/services`,
  withCredentials: true,
});
console.log("API URL:", import.meta.env.VITE_API_URL);

axiosServiceInstance.interceptors.request.use((config) => {
  const token = localStorage.getItem("accessToken");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default axiosServiceInstance;