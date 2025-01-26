import { api } from "./api";

export const dashboardService = {
  getDashboardData: async () => {
    try {
      console.log("Fetching dashboard data...");
      const response = await api.get("/api/dashboard");
      console.log("Dashboard data received:", response.data);
      return response.data;
    } catch (error) {
      console.error("Dashboard service error:", error);
      throw error;
    }
  },

  getStatistics: async () => {
    const response = await api.get("/dashboard/statistics");
    return response.data;
  },

  getRecentCustomers: async () => {
    const response = await api.get("/dashboard/recent-customers");
    return response.data;
  },

  getCustomersByMonth: async () => {
    const response = await api.get("/dashboard/customers-by-month");
    return response.data;
  },

  getCustomersByStatus: async () => {
    const response = await api.get("/dashboard/customers-by-status");
    return response.data;
  },
};
