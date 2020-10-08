export function del(req, res) {
  delete req.session
  res.setHeader("Content-Type", "application/json")
  res
    .cookie("token", null, {
      maxAge: 0,
    })
    .end()
}
