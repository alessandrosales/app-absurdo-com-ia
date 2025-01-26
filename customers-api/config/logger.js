const winston = require("winston");
const path = require("path");

const logger = winston.createLogger({
  format: winston.format.combine(
    winston.format.timestamp({ format: "YYYY-MM-DD HH:mm:ss" }),
    winston.format.errors({ stack: true }),
    winston.format.json()
  ),
  transports: [
    // Log de erros em arquivo
    new winston.transports.File({
      filename: path.join("logs", "error.log"),
      level: "error",
    }),
    // Log de todas as informações em arquivo
    new winston.transports.File({
      filename: path.join("logs", "combined.log"),
    }),
    // Log no console durante desenvolvimento
    new winston.transports.Console({
      format: winston.format.combine(
        winston.format.colorize(),
        winston.format.simple()
      ),
    }),
  ],
});

module.exports = logger;
