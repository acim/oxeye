import jwt from "jsonwebtoken";
import User from "../../models/User";
import logger from "../../utils/logger";

export async function post(req, res) {
  res.setHeader("Content-Type", "application/json");

  try {
    const user = req.body;
    logger.info(`creating user '${user.username}'`);
    await User.create(user);
    res.status(204).end();
  } catch (err) {
    res.status(500).json({
      error: err.message,
    });
  }
}
