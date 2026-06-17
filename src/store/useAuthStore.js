import { create } from "zustand";
import {
  changePasswordService,
  loginService,
  resetPasswordService,
  sendResetOtpService,
  verifyAuthService,
} from "../service/authService";

const useAuthStore = create((set) => ({
  user: null,
  accessToken: localStorage.getItem("accessToken") || null,
  loading: false,
  error: null,

  login: async (formData) => {
    try {
      set({ loading: true, error: null });
      const res = await loginService(formData);
      localStorage.setItem("accessToken", res.token);
      set({
        user: res.userData,
        accessToken: res.token,
        loading: false,
      });
      return { success: true };
    } catch (error) {
      const message = error.response?.data?.message || error.message || "Login failed";
      set({ loading: false, error: message });
      return { success: false, error: message };
    }
  },

  verifyAuth: async () => {
    try {
      set({ loading: true, error: null });
      const user = await verifyAuthService();
      set({ user, loading: false });
      return { success: true, data: user };
    } catch (error) {
      const message = error.response?.data?.message || error.message || "Session expired";
      localStorage.removeItem("accessToken");
      set({ user: null, accessToken: null, loading: false, error: message });
      return { success: false, error: message };
    }
  },

  logout: () => {
    localStorage.removeItem("accessToken");
    set({ user: null, accessToken: null, error: null });
  },

  sendResetOtp: async (formData) => {
    try {
      set({ loading: true, error: null });
      const res = await sendResetOtpService(formData);
      set({ loading: false });
      return { success: true, message: res.message };
    } catch (error) {
      const message = error.response?.data?.message || error.message || "Failed to send OTP";
      set({ loading: false, error: message });
      return { success: false, error: message };
    }
  },

  resetPassword: async (formData) => {
    try {
      set({ loading: true, error: null });
      const res = await resetPasswordService(formData);
      set({ loading: false });
      return { success: true, message: res.message };
    } catch (error) {
      const message = error.response?.data?.message || error.message || "Failed to reset password";
      set({ loading: false, error: message });
      return { success: false, error: message };
    }
  },

  changePassword: async (formData) => {
    try {
      set({ loading: true, error: null });
      const res = await changePasswordService(formData);
      set({ loading: false });
      return { success: true, message: res.message };
    } catch (error) {
      const message = error.response?.data?.message || error.message || "Failed to change password";
      set({ loading: false, error: message });
      return { success: false, error: message };
    }
  },
}));

export default useAuthStore;
