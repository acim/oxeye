import type { Request, Response } from "express"

export function get(req: Request, res: Response) {
  res.setHeader("Content-Type", "application/json")

  if (!req.session.user) {
    res.status(401).json({
      error: "Unauthorized",
    })
    return
  }

  res.json(req.session.user)
}
