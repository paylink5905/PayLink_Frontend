import axios from "axios";

const axiosPaymentLinkInstance = axios.create({
  baseURL: "/api/payment-links",
  withCredentials: true,
});

axiosPaymentLinkInstance.interceptors.request.use((config) => {
  const token = localStorage.getItem("accessToken");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default axiosPaymentLinkInstance;
