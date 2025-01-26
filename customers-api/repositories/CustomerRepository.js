const connection = require("../database/connection");

class CustomerRepository {
  async findAll() {
    return await connection("customers").select("*");
  }

  async findByEmail(email) {
    return await connection("customers").where("email", email).first();
  }

  async findById(id) {
    return await connection("customers").where("id", id).first();
  }

  async create(customer) {
    await connection("customers").insert(customer);
    return customer;
  }

  async update(id, customer) {
    await connection("customers").where("id", id).update({
      name: customer.name,
      email: customer.email,
      updated_at: new Date(),
    });
    return { id, ...customer };
  }

  async delete(id) {
    await connection("customers").where("id", id).delete();
  }
}

module.exports = new CustomerRepository();
