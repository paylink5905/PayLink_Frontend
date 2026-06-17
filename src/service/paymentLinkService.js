import axiosPaymentLinkInstance from "../axiosInstance/axiosPaymentLinkInstance";

export const createPaymentLinkService = async (formData) => {
  const res = await axiosPaymentLinkInstance.post("/", formData);
  return res.data.data;
};

export const getAllPaymentLinksService = async () => {
  const res = await axiosPaymentLinkInstance.get("/");
  return res.data.data;
};

export const getPaymentLinkByIdService = async (id) => {
  const res = await axiosPaymentLinkInstance.get(`/${id}`);
  return res.data.data;
};

export const getPublicPaymentLinkService = async (token) => {
  const res = await axiosPaymentLinkInstance.get(`/public/${token}`);
  return res.data.data;
};
