import User from "../../models/User";
import jwt from "jsonwebtoken";

export async function get(req, res, next) {
  try {
    const decoded = jwt.verify(
      decodeURI(req.query.token),
      process.env.JWT_SECRET_KEY
    );
    const user = await User.findOne({ username: decoded.username });
    user.activate();
    res.setHeader("Content-Type", "application/json");
    res.json({ message: "user activate, you can try to login now" });
  } catch (err) {
    res.status(500).json({
      error: err.message,
    });
  }
}
