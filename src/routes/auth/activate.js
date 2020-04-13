export function get(req, res, next) {
  res.setHeader("Content-Type", "application/json");
  res.status(200).end({
    params: req.params,
  });
}
