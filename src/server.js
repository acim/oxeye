import sirv from "sirv";
import express from "express";
import compression from "compression";
import * as sapper from "@sapper/server";
import dotenv from "dotenv";
import logger from "./utils/logger";
import morgan from "morgan";
import mongoSanitize from "express-mongo-sanitize";
// import uuidv4 from 'uuid/v4';
import helmet from "helmet";
import xss from "xss-clean";
import rateLimit from "express-rate-limit";
import hpp from "hpp";
import mongo from "./utils/mongo";
import cookieParser from "cookie-parser";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import User from "./models/User";

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
      console.log(err);
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
  // Commented out because of https://github.com/sveltejs/sapper/issues/343
  // (req, res, next) => {
  //   res.locals.nonce = uuidv4();
  //   next();
  // },
  // helmet({
  //   contentSecurityPolicy: {
  //     directives: {
  //       scriptSrc: [
  //         "'self'",
  //         (req, res) => `'nonce-${res.locals.nonce}'`
  //       ]
  //     }
  //   }
  // }),
  helmet(),
  xss(),
  rateLimit({
    windowMs: 10 * 60 * 1000, // 10 mins
    max: 100,
  }),
  hpp(),
  sapper.middleware({
    session: (req, res) => req.session,
  })
);

app.listen(PORT, (err) => {
  if (err) logger.error(err.message);
});

process.on("unhandledRejection", (err) => {
  logger.error(err.message);
});

const initAdmin = async () => {
  try {
    const countUsers = await User.countDocuments({});
    if (countUsers) {
      return;
    }

    const { generate } = await import("randomstring");
    const plainPwd = generate();
    const hashPwd = await bcrypt.hash(plainPwd, 10);
    logger.info(`creating admin user with password '${plainPwd}'`);
    const u = new User({
      firstName: "John",
      lastName: "Doe",
      username: "admin",
      email: "admin@test.com",
      password: hashPwd,
    });
    await u.save();
  } catch (err) {
    logger.error(err.message);
  }
};

initAdmin();
