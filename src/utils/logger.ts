import * as winston from "winston"

const logger = winston.createLogger({
  levels: winston.config.npm.levels,
  transports: [
    new winston.transports.Console({
      level: process.env.LOG_LEVEL || "warning",
      handleExceptions: true,
    }),
  ],
  exitOnError: false,
})

logger.stream = () =>
  winston.stream({
    write: function (message) {
      logger.info(message.trim())
    },
  })
export default logger
