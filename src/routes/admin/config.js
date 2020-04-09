export function get(req, res) {
  res.setHeader("Content-Type", "application/json");

  if (!req.user) {
    res.status(401).json({
      error: "Unauthorized",
    });
  }

  res.end(JSON.stringify(req.user));
  return;
}
