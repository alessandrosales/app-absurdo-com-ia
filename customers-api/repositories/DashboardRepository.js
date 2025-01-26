const connection = require("../database/connection");

class DashboardRepository {
  async getCustomersCount() {
    const result = await connection("customers").count("* as total").first();
    return result.total;
  }

  async getNewCustomersCount() {
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

    const result = await connection("customers")
      .where("created_at", ">=", thirtyDaysAgo)
      .count("* as total")
      .first();
    return result.total;
  }

  async getCustomersByMonth() {
    const sixMonthsAgo = new Date();
    sixMonthsAgo.setMonth(sixMonthsAgo.getMonth() - 6);

    return await connection("customers")
      .select(
        connection.raw("strftime('%Y-%m', created_at) as month"),
        connection.raw("count(*) as total")
      )
      .where("created_at", ">=", sixMonthsAgo)
      .groupBy("month")
      .orderBy("month");
  }

  async getTopDomains() {
    return await connection("customers")
      .select(
        connection.raw("substr(email, instr(email, '@') + 1) as domain"),
        connection.raw("count(*) as total")
      )
      .groupBy("domain")
      .orderBy("total", "desc")
      .limit(5);
  }
}

module.exports = new DashboardRepository();
