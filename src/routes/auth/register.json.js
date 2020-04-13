import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import User from "../../models/User";
import Role from "../../models/Role";
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
    user.password = await bcrypt.hash(user.password, 10);
    const role = await Role.findOne({ name: "subscriber" });
    user.role = role.id;
    logger.info(`creating user '${user.username}'`);
    const u = await User.create(user);
    res.status(204).end();
  } catch (err) {
    res.status(500).json({
      error: err.message,
    });
  }
}
