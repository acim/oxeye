import User from "../../models/User";

export function get(req, res, next) {
  const decoded = jwt.verify(req.params.query.token, process.env.JWT_SECRET_KEY);
  const user = await User.findOne({username: decoded.username});

  res.setHeader("Content-Type", "application/json");
  res.status(200).end({
    user,
  });
}
