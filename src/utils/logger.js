import * as winston from "winston";

export default () => {
  const logger = winston.createLogger({
    transports: [
      new winston.transports.Console({
        level: process.env.LOG_LEVEL || "warning",
        handleExceptions: true
      })
    ],
    exitOnError: false
  });

  logger.stream = {
    write: function(message, encoding) {
      logger.info(message);
    }
  };

  return logger;
}