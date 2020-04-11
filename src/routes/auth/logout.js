export function del(req, res) {
  delete req.user;
  res.setHeader("Content-Type", "application/json");
  res
    .cookie("token", null, {
      maxAge: 0,
    })
    .end();
}
