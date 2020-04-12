import sirv from "sirv";
import express from "express";
import compression from "compression";
import * as sapper from "@sapper/server";
import dotenv from "dotenv";
import logger from "./utils/logger";
import morgan from "morgan";
import mongoSanitize from "express-mongo-sanitize";
import uuidv4 from 'uuid/v4';
import helmet from "helmet";
import xss from "xss-clean";
import rateLimit from "express-rate-limit";
import hpp from "hpp";
import mongo from "./utils/mongo";
import cookieParser from "cookie-parser";
import jwt from "jsonwebtoken";
// import bcrypt from "bcrypt";
// import User from "./models/User";

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
    req.user = getUser(req);
    next();
  },
  mongoSanitize(),
  (req, res, next) => {
    res.locals.nonce = uuidv4();
    next();
  },
  helmet({
    contentSecurityPolicy: {
      directives: {
        scriptSrc: [
          "'self'",
          (req, res) => `'nonce-${res.locals.nonce}'`
        ]
      }
    }
  }),
  xss(),
  rateLimit({
    windowMs: 10 * 60 * 1000, // 10 mins
    max: 100,
  }),
  hpp(),
  sapper.middleware({
    session: (req, res) => ({
      user: req.user,
    }),
  })
);

app.listen(PORT, (err) => {
  if (err) logger.error(err.message);
});

process.on("unhandledRejection", (err) => {
  logger.error(err.message);
});

// const hash = async () => {
//   const plainPwd = "123";
//   const pwd = await bcrypt.hash(a, 10);
//   const u = new User({
//     firstName: "Boban",
//     lastName: "Acimovic",
//     username: "acim",
//     email: "boban.acimovic@gmail.com",
//     password: pwd,
//   });
//   await u.save();
// };

// try {
//   hash();
// } catch (err) {
//   logger.error(err);
// }
