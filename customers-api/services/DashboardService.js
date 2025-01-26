const DashboardRepository = require("../repositories/DashboardRepository");
const AppError = require("../errors/AppError");
const logger = require("../config/logger");

class DashboardService {
  async getDashboardData() {
    try {
      logger.info("Buscando dados do dashboard");

      const [totalCustomers, newCustomers, customersByMonth, topDomains] =
        await Promise.all([
          DashboardRepository.getCustomersCount(),
          DashboardRepository.getNewCustomersCount(),
          DashboardRepository.getCustomersByMonth(),
          DashboardRepository.getTopDomains(),
        ]);

      return {
        totalCustomers,
        newCustomers,
        customersByMonth,
        topDomains,
      };
    } catch (error) {
      logger.error("Erro ao buscar dados do dashboard", {
        error: error.message,
        stack: error.stack,
      });
      throw new AppError("Erro ao buscar dados do dashboard", 500);
    }
  }
}

module.exports = new DashboardService();
