const DashboardService = require("../services/DashboardService");
const logger = require("../config/logger");

class DashboardController {
  async index(req, res, next) {
    try {
      logger.info("Requisição de dados do dashboard");
      const data = await DashboardService.getDashboardData();
      return res.json(data);
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new DashboardController();
