import User from "../../models/User";

export async function post(req, res) {
  res.setHeader("Content-Type", "application/json");

  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username });
    if (!user.isValidPassword(password)) {
      throw new Error();
    }
    res
      .cookie("token", user.generateToken("1h"), {
        expires: new Date(Date.now() + 60 * 60 * 1000),
        httpOnly: true,
      })
      .end(
        JSON.stringify({
          user: {
            username,
          },
        })
      );
  } catch (err) {
    res.status(401).json({
      error: "Invalid credentials",
    });
  }
}
