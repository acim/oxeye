export function del(req, res) {
  if (req.user) {
    req.user = null;
  }
  res.setHeader("Content-Type", "application/json");
  res
    .cookie("token", null, {
      maxAge: 0,
    })
    .end();
}
