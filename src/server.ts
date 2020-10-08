import sirv from "sirv"
import express, { Request, Response } from "express"
import compression from "compression"
import * as sapper from "@sapper/server"
import dotenv from "dotenv"
import logger from "./utils/logger"
import morgan from "morgan"
import mongoSanitize from "express-mongo-sanitize"
import helmet from "helmet"
import xss from "xss-clean"
import rateLimit from "express-rate-limit"
import hpp from "hpp"
import mongo from "./utils/mongo"
import cookieParser from "cookie-parser"
import jwt from "jsonwebtoken"
import seed from "./utils/seed"
import type { UserSimple } from "./models/User"

const { PORT, NODE_ENV } = process.env
const dev = NODE_ENV === "development"
const defaultSrc = ["'self'"]
if (dev) {
  defaultSrc.push("http://localhost:10000")
}

dotenv.config()

declare global {
  namespace Express {
    export interface Request {
      session: {
        user: UserSimple
      }
    }
  }
}

mongo()

const getUser: (Request) => UserSimple = (req) => {
  let token: string
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1]
  } else if (req.cookies.token) {
    token = req.cookies.token
  }

  if (token) {
    let decoded
    try {
      decoded = jwt.verify(token, process.env.JWT_SECRET_KEY)
    } catch (err) {
      logger.error(err.message)
    }

    if (decoded) {
      return { username: decoded.username }
    }
  }
}

const app = express()

app.use(
  compression({ threshold: 0 }),
  sirv("static", { dev }),
  morgan("tiny", { stream: logger.stream }),
  express.json(),
  cookieParser(),
  (req, res, next) => {
    req.session = { user: getUser(req) }
    next()
  },
  mongoSanitize(),
  helmet.contentSecurityPolicy({
    directives: {
      defaultSrc,
      styleSrc: ["'unsafe-inline'", "'self'", "https:"],
      fontSrc: ["'self'", "https:"],
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
        return true
      }
    },
  }),
  hpp(),
  sapper.middleware({
    session: (req, res) => req.session,
  })
)

const server = app.listen(PORT)

process.on("unhandledRejection", (err: Error, promise) => {
  console.log(err.message)
  server.close(() => process.exit(1))
})

seed()
