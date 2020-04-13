export function get(req, res, next) {
  const { token } = req.params;

  res.setHeader("Content-Type", "application/json");
  res.status(200).end({
    token,
  });
}
