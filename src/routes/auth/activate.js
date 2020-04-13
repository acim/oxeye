import User from "../../models/User";
import jwt from "jsonwebtoken";

export async function get(req, res, next) {
  try {
    const decoded = jwt.verify(
      decodeURI(req.query.token),
      process.env.JWT_SECRET_KEY
    );
    const user = await User.findOne({ username: decoded.username });
    res.setHeader("Content-Type", "application/json");
    res.json(user);
  } catch (err) {
    res.status(500).json({
      error: err.message,
    });
  }
}
