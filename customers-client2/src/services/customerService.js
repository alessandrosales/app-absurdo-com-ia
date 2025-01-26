import { api } from "./api";

export const customerService = {
  getAllCustomers: async () => {
    try {
      const response = await api.get("/api/customers");
      return response.data;
    } catch (error) {
      console.error("Error fetching customers:", error);
      throw error;
    }
  },

  getCustomerById: async (id) => {
    try {
      const response = await api.get(`/api/customers/${id}`);
      return response.data;
    } catch (error) {
      console.error("Error fetching customer:", error);
      throw error;
    }
  },

  createCustomer: async (customer) => {
    try {
      const response = await api.post("/api/customers", customer);
      return response.data;
    } catch (error) {
      console.error("Error creating customer:", error);
      throw error;
    }
  },

  updateCustomer: async (id, customer) => {
    try {
      const response = await api.put(`/api/customers/${id}`, customer);
      return response.data;
    } catch (error) {
      console.error("Error updating customer:", error);
      throw error;
    }
  },

  deleteCustomer: async (id) => {
    try {
      await api.delete(`/api/customers/${id}`);
    } catch (error) {
      console.error("Error deleting customer:", error);
      throw error;
    }
  },
};
