import { create } from "zustand";
import {
  createPaymentLinkService,
  getAllPaymentLinksService,
  getPaymentLinkByIdService,
} from "../service/paymentLinkService";

const usePaymentLinkStore = create((set) => ({
  paymentLinks: [],
  paymentLink: null,
  generatedPaymentLink: null,
  loading: false,
  error: null,

  createPaymentLink: async (formData) => {
    try {
      set({ loading: true, error: null, generatedPaymentLink: null });
      const data = await createPaymentLinkService(formData);
      set((state) => ({
        paymentLinks: [data, ...state.paymentLinks],
        generatedPaymentLink: data,
        loading: false,
      }));
      return { success: true, data };
    } catch (error) {
      const message = error.response?.data?.message || error.message || "Failed to generate payment link";
      set({ loading: false, error: message });
      return { success: false, error: message };
    }
  },

  getAllPaymentLinks: async () => {
    try {
      set({ loading: true, error: null });
      const data = await getAllPaymentLinksService();
      set({ paymentLinks: data, loading: false });
      return { success: true, data };
    } catch (error) {
      const message = error.response?.data?.message || error.message || "Failed to fetch payment links";
      set({ paymentLinks: [], loading: false, error: message });
      return { success: false, error: message };
    }
  },

  getPaymentLinkById: async (id) => {
    try {
      set({ loading: true, error: null });
      const data = await getPaymentLinkByIdService(id);
      set({ paymentLink: data, loading: false });
      return { success: true, data };
    } catch (error) {
      const message = error.response?.data?.message || error.message || "Failed to fetch payment link";
      set({ loading: false, error: message });
      return { success: false, error: message };
    }
  },

  clearGeneratedPaymentLink: () => set({ generatedPaymentLink: null }),
}));

export default usePaymentLinkStore;
