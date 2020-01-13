import * as winston from "winston";

const logger = winston.createLogger({
  transports: [
    new winston.transports.Console({
      level: process.env.NODE_ENV === "production" ? "warning" : "debug",
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

export default logger;
