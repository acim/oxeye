import sirv from "sirv";
import express from "express";
import compression from "compression";
import * as sapper from "@sapper/server";
import dotenv from "dotenv";
import logger from "./utils/logger";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import mongoSanitize from "express-mongo-sanitize";
import helmet from "helmet";
import xss from "xss-clean";
import rateLimit from "express-rate-limit";
import hpp from "hpp";
import mongo from "./utils/mongo";

const { PORT, NODE_ENV } = process.env;
const dev = NODE_ENV === "development";
dotenv.config();

mongo();

const app = express();

app.use(
  compression({ threshold: 0 }),
  sirv("static", { dev }),
  morgan("combined", { stream: logger().stream }),
  express.json(),
  cookieParser(),
  mongoSanitize(),
  helmet(),
  xss(),
  rateLimit({
    windowMs: 10 * 60 * 1000, // 10 mins
    max: 100
  }),
  hpp(),
  sapper.middleware()
);

app.listen(PORT, err => {
  if (err) logger.error(err);
});
