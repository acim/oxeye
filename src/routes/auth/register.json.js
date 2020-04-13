import jwt from "jsonwebtoken";
import User from "../../models/User";
import logger from "../../utils/logger";

const generateToken = (username) => {
  return jwt.sign({ username }, process.env.JWT_SECRET_KEY, {
    expiresIn: "1h",
  });
};

export async function post(req, res) {
  res.setHeader("Content-Type", "application/json");

  try {
    const user = req.body;
    user.role = "subscriber";
    logger.info(`creating user '${user.username}'`);
    await User.create(user);
    res.status(204).end();
  } catch (err) {
    res.status(500).json({
      error: err.message,
    });
  }
}
