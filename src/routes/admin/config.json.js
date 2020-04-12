export function get(req, res) {
  res.setHeader("Content-Type", "application/json");

  if (!req.session.user) {
    res.status(401).json({
      error: "Unauthorized",
    });
    return;
  }

  res.end(JSON.stringify(req.session.user));
}
