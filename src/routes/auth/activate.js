import User from "../../models/User";
import jwt from "jsonwebtoken";

export async function get(req, res, next) {
  try {
    const decoded = jwt.verify(
      req.params.query.token,
      process.env.JWT_SECRET_KEY
    );
    const user = await User.findOne({ username: decoded.username });
    res.setHeader("Content-Type", "application/json");
    res.status(200).end({
      user,
    });
  } catch (err) {
    res.status(500).end({
      error: err.message,
    });
  }
}
