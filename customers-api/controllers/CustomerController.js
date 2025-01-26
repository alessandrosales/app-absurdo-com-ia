const CustomerService = require("../services/CustomerService");
const AppError = require("../errors/AppError");
const logger = require("../config/logger");

class CustomerController {
  async index(req, res, next) {
    try {
      logger.info("Buscando todos os clientes");
      const customers = await CustomerService.findAll();
      return res.json(customers);
    } catch (error) {
      next(error);
    }
  }

  async show(req, res, next) {
    try {
      const { id } = req.params;
      logger.info("Buscando cliente específico", { id });
      const customer = await CustomerService.findById(id);
      return res.json(customer);
    } catch (error) {
      next(error);
    }
  }

  async store(req, res, next) {
    try {
      logger.info("Criando novo cliente", { data: req.body });
      const customer = await CustomerService.create(req.body);
      logger.info("Cliente criado com sucesso", { customer });
      return res.status(201).json(customer);
    } catch (error) {
      next(error);
    }
  }

  async update(req, res, next) {
    try {
      const { id } = req.params;
      logger.info("Atualizando cliente", { id, data: req.body });
      const customer = await CustomerService.update(id, req.body);
      logger.info("Cliente atualizado com sucesso", { id });
      return res.json(customer);
    } catch (error) {
      next(error);
    }
  }

  async delete(req, res, next) {
    try {
      const { id } = req.params;
      logger.info("Deletando cliente", { id });
      await CustomerService.delete(id);
      return res.status(204).send();
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new CustomerController();
