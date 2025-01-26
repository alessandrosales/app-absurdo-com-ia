const express = require("express");
const swaggerUi = require("swagger-ui-express");
const swaggerJsdoc = require("swagger-jsdoc");
const logger = require("./config/logger");
const errorHandler = require("./middlewares/errorHandler");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

const swaggerOptions = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "API de Clientes",
      version: "1.0.0",
      description: "API para gerenciamento de clientes",
    },
    servers: [
      {
        url: "http://localhost:3000",
        description: "Servidor de desenvolvimento",
      },
    ],
  },
  apis: ["./routes/*.js"],
};

const swaggerDocs = swaggerJsdoc(swaggerOptions);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));

// Importando rotas
const customerRoutes = require("./routes/customers");
app.use("/api/customers", customerRoutes);

const dashboardRoutes = require("./routes/dashboard");
app.use("/api/dashboard", dashboardRoutes);

// Middleware de erro deve ser o último
app.use(errorHandler);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  logger.info(`Servidor rodando na porta ${PORT}`);
  logger.info(`Documentação disponível em http://localhost:${PORT}/api-docs`);
});

// Tratamento de erros não capturados
process.on("uncaughtException", (error) => {
  logger.error("Erro não tratado:", error);
  process.exit(1);
});

process.on("unhandledRejection", (error) => {
  logger.error("Promessa rejeitada não tratada:", error);
  process.exit(1);
});
