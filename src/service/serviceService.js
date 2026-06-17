import axiosServiceInstance from "../axiosInstance/axiosServiceInstance";

export const createServiceService = async (formData) => {
  const res = await axiosServiceInstance.post("/services", formData);
  return res.data.data;
};

export const getAllServicesService = async () => {
  const res = await axiosServiceInstance.get("/services");
  return res.data.data;
};

export const getServiceByIdService = async (id) => {
  const res = await axiosServiceInstance.get(`/services/${id}`);
  return res.data.data;
};

export const updateServiceService = async (id, formData) => {
  console.log("update service is being called")
  const res = await axiosServiceInstance.put(`/services/${id}`, formData);
  console.log(`res.data: ${res.data}`)
  console.log(`res.data: ${res.data.data}`)
  return res.data.data;
};
