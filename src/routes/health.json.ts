import type { Request, Response } from "express"

export function get(req: Request, res: Response) {
  res.setHeader("Content-Type", "application/json")
  res.status(200).end()
}
