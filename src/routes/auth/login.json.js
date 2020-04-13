import jwt from "jsonwebtoken";
import User from "../../models/User";

const generateToken = (username) => {
  return jwt.sign({ username }, process.env.JWT_SECRET_KEY, {
    expiresIn: "1h",
  });
};

export async function post(req, res) {
  res.setHeader("Content-Type", "application/json");

  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username });
    if (!user.isValidPassword(password)) {
      throw new Error();
    }
    const token = generateToken(username);
    res
      .cookie("token", token, {
        expires: new Date(Date.now() + 60 * 60 * 1000),
        httpOnly: true,
      })
      .end(
        JSON.stringify({
          user: {
            username,
            token: token,
          },
        })
      );
  } catch (err) {
    res.status(401).json({
      error: "Invalid credentials",
    });
  }
}
