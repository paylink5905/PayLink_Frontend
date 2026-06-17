import axiosAuthInstance from "../axiosInstance/axiosAuthInstance";

export const loginService = async (formData) => {
  const res = await axiosAuthInstance.post("/login", formData);
  return res.data;
};

export const verifyAuthService = async () => {
  const res = await axiosAuthInstance.get("/verify");
  return res.data.data;
};

export const sendResetOtpService = async (formData) => {
  const res = await axiosAuthInstance.post("/forgot-password/send-otp", formData);
  return res.data;
};

export const resetPasswordService = async (formData) => {
  const res = await axiosAuthInstance.post("/forgot-password/reset", formData);
  return res.data;
};

export const changePasswordService = async (formData) => {
  const res = await axiosAuthInstance.patch("/change-password", formData);
  return res.data;
};
