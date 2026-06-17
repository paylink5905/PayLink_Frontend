import { create } from "zustand";
import {
  createServiceService,
  getAllServicesService,
  getServiceByIdService,
  updateServiceService,
} from "../service/serviceService";

const useServiceStore = create((set) => ({
  services: [],
  service: null,
  loading: false,
  error: null,

  getAllServices: async () => {
    try {
      set({ loading: true, error: null });
      const services = await getAllServicesService();
      console.log("Fetched services:", services);
      set({ services, loading: false });
      return { success: true, data: services };
    } catch (error) {
      const message = error.response?.data?.message || error.message || "Failed to fetch services";
      set({ services: [], loading: false, error: message });
      return { success: false, error: message };
    }
  },

  getServiceById: async (id) => {
    try {
      set({ loading: true, error: null });
      const service = await getServiceByIdService(id);
      set({ service, loading: false });
      return { success: true, data: service };
    } catch (error) {
      const message = error.response?.data?.message || error.message || "Failed to fetch service";
      set({ loading: false, error: message });
      return { success: false, error: message };
    }
  },

  createService: async (formData) => {
    try {
      set({ loading: true, error: null });
      const data = await createServiceService(formData);
      set((state) => ({
        services: [data, ...state.services],
        loading: false,
      }));
      return { success: true, data };
    } catch (error) {
      const message = error.response?.data?.message || error.message || "Failed to create service";
      set({ loading: false, error: message });
      return { success: false, error: message };
    }
  },

  updateService: async (id, formData) => {
    try {
      set({ loading: true, error: null });
      console.log(`Updating service with id ${id} and formData:`, formData);
      const data = await updateServiceService(id, formData);
      console.log(`Updated service data received:`, data);
      set((state) => ({
        services: state.services.map((service) => service.id === data.id ? data : service),
        service: data,
        loading: false,
      }));
      console.log(`Service with id ${id} updated successfully.`);
      return { success: true, data };
    } catch (error) {
      const message = error.response?.data?.message || error.message || "Failed to update service";
      set({ loading: false, error: message });
      return { success: false, error: message };
    }
  },
}));

export default useServiceStore;
