const CustomerRepository = require("../repositories/CustomerRepository");
const AppError = require("../errors/AppError");
const logger = require("../config/logger");

class CustomerService {
  async findAll() {
    try {
      return await CustomerRepository.findAll();
    } catch (error) {
      logger.error("Erro ao buscar clientes", { error });
      throw new AppError("Erro ao buscar clientes", 500);
    }
  }

  async findById(id) {
    try {
      const customer = await CustomerRepository.findById(id);

      if (!customer) {
        logger.warn("Cliente não encontrado", { id });
        throw new AppError("Cliente não encontrado", 404);
      }

      return customer;
    } catch (error) {
      if (error instanceof AppError) throw error;

      logger.error("Erro ao buscar cliente", { error, id });
      throw new AppError("Erro ao buscar cliente", 500);
    }
  }

  async create(customerData) {
    const { name, email } = customerData;

    logger.info("Iniciando criação de cliente", { customerData });

    if (!name || !email) {
      logger.warn("Tentativa de criar cliente sem nome ou email", {
        customerData,
      });
      throw new AppError("Nome e email são obrigatórios");
    }

    try {
      const existingCustomer = await CustomerRepository.findByEmail(email);
      if (existingCustomer) {
        logger.warn("Tentativa de criar cliente com email duplicado", {
          email,
        });
        throw new AppError("Email já cadastrado");
      }

      const customer = {
        id: Date.now().toString(),
        name,
        email,
      };

      return await CustomerRepository.create(customer);
    } catch (error) {
      if (error instanceof AppError) throw error;

      logger.error("Erro ao criar cliente", {
        error: error.message,
        stack: error.stack,
        customerData,
      });
      throw new AppError("Erro ao criar cliente", 500);
    }
  }

  async update(id, customerData) {
    const { name, email } = customerData;

    logger.info("Iniciando atualização de cliente", { id, customerData });

    if (!name || !email) {
      logger.warn("Tentativa de atualizar cliente sem nome ou email", {
        id,
        customerData,
      });
      throw new AppError("Nome e email são obrigatórios");
    }

    try {
      const existingCustomer = await CustomerRepository.findById(id);
      if (!existingCustomer) {
        logger.warn("Tentativa de atualizar cliente inexistente", { id });
        throw new AppError("Cliente não encontrado", 404);
      }

      const emailInUse = await CustomerRepository.findByEmail(email);
      if (emailInUse && emailInUse.id !== id) {
        logger.warn("Tentativa de atualizar cliente com email duplicado", {
          id,
          email,
        });
        throw new AppError("Email já cadastrado por outro cliente");
      }

      const updatedCustomer = await CustomerRepository.update(id, {
        name,
        email,
      });

      logger.info("Cliente atualizado com sucesso", { id });
      return updatedCustomer;
    } catch (error) {
      if (error instanceof AppError) throw error;

      logger.error("Erro ao atualizar cliente", {
        error: error.message,
        stack: error.stack,
        id,
        customerData,
      });
      throw new AppError("Erro ao atualizar cliente", 500);
    }
  }

  async delete(id) {
    try {
      const customer = await CustomerRepository.findById(id);

      if (!customer) {
        logger.warn("Tentativa de deletar cliente inexistente", { id });
        throw new AppError("Cliente não encontrado", 404);
      }

      await CustomerRepository.delete(id);
      logger.info("Cliente deletado com sucesso", { id });
    } catch (error) {
      if (error instanceof AppError) throw error;

      logger.error("Erro ao deletar cliente", {
        error: error.message,
        stack: error.stack,
        id,
      });
      throw new AppError("Erro ao deletar cliente", 500);
    }
  }
}

module.exports = new CustomerService();
