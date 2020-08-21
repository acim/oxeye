import sirv from "sirv";
import express from "express";
import compression from "compression";
import * as sapper from "@sapper/server";
import dotenv from "dotenv";
import logger from "./utils/logger";
import morgan from "morgan";
import mongoSanitize from "express-mongo-sanitize";
import helmet from "helmet";
import xss from "xss-clean";
import rateLimit from "express-rate-limit";
import hpp from "hpp";
import mongo from "./utils/mongo";
import cookieParser from "cookie-parser";
import jwt from "jsonwebtoken";
import seed from "./utils/seed";

const { PORT, NODE_ENV } = process.env;
const dev = NODE_ENV === "development";
dotenv.config();

mongo();

const getUser = (req) => {
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];
  } else if (req.cookies.token) {
    token = req.cookies.token;
  }

  if (token) {
    let decoded;
    try {
      decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
    } catch (err) {
      logger.error(err.message);
    }

    if (decoded) {
      return { username: decoded.username };
    }
  }
};

const app = express();

app.use(
  compression({ threshold: 0 }),
  sirv("static", { dev }),
  morgan("tiny", { stream: logger.stream }),
  express.json(),
  cookieParser(),
  (req, res, next) => {
    req.session = { user: getUser(req) };
    next();
  },
  mongoSanitize(),
  helmet.contentSecurityPolicy({
    directives: {
      defaultSrc: ["'self'", "http://localhost:10000"],
      styleSrc: ["'self'", "https:", "'unsafe-inline'"],
      fontSrc: ["'self'"],
      scriptSrc: ["'self'", "'unsafe-inline'", "'unsafe-eval'"],
    },
  }),
  helmet.dnsPrefetchControl(),
  helmet.expectCt(),
  helmet.frameguard(),
  helmet.hidePoweredBy(),
  helmet.hsts(),
  helmet.ieNoOpen(),
  helmet.noSniff(),
  helmet.permittedCrossDomainPolicies(),
  helmet.referrerPolicy(),
  helmet.xssFilter(),
  xss(),
  rateLimit({
    windowMs: 10 * 60 * 1000, // 10 mins
    max: 100,
    skip: (req, res) => {
      if (req.url == "/health.json") {
        return true;
      }
    },
  }),
  hpp(),
  sapper.middleware({
    session: (req, res) => req.session,
  })
);

const server = app.listen(PORT, (err) => {
  if (err) logger.error(err.message);
});

process.on("unhandledRejection", (err, promise) => {
  logger.error(err.message);
  server.close(() => process.exit(1));
});

seed();
