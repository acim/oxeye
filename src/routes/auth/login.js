import jwt from "jsonwebtoken";

const generateToken = (username) => {
  return jwt.sign({ username }, "4TvMZCZoBWfRrbK2e6xSIOoC1leN7pX9", {
    // FIXME: Get secret key from configuration
    expiresIn: "1h",
  });
};

export function post(req, res) {
  const auth = req.body;
  res.setHeader("Content-Type", "application/json");

  //   TODO: Handle authentication properly
  if (auth.username === "admin" && auth.password === "123") {
    const token = generateToken(auth.username);
    res
      .cookie("token", token, {
        expires: new Date(Date.now() + 60 * 60 * 1000),
        httpOnly: true,
      })
      .end(
        JSON.stringify({
          user: {
            username: auth.username,
            token: token,
          },
        })
      );
    return;
  }

  res.status(401).json({
    error: "Wrong username or password",
  });
}
