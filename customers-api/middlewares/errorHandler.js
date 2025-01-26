const logger = require("../config/logger");
const AppError = require("../errors/AppError");

function errorHandler(error, req, res, next) {
  logger.error({
    message: error.message,
    stack: error.stack,
    method: req.method,
    path: req.path,
    body: req.body,
    params: req.params,
    query: req.query,
  });

  if (error instanceof AppError) {
    return res.status(error.statusCode).json({
      status: "error",
      message: error.message,
    });
  }

  return res.status(500).json({
    status: "error",
    message: "Erro interno do servidor",
  });
}

module.exports = errorHandler;
