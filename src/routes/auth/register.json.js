import jwt from "jsonwebtoken"
import User from "../../models/User"
import logger from "../../utils/logger"
import { Mailgun } from "../../utils/mail"

export async function post(req, res) {
  res.setHeader("Content-Type", "application/json")

  try {
    const data = req.body
    logger.info(`creating user '${data.username}'`)
    const user = await User.create(data)
    const token = encodeURI(user.generateToken("24h"))
    const mg = new Mailgun()
    mg.send({
      from: "oxeye@ablab.io",
      to: data.email,
      subject: "Oxeye activation",
      text: `https://oxeye.ablab.io/activate?token=${token}`,
    })
    res.status(204).end()
  } catch (err) {
    res.status(500).json({
      error: err.message,
    })
  }
}
