import type { Request, Response } from "express"

export function del(req: Request, res: Response) {
  delete req.session
  res.setHeader("Content-Type", "application/json")
  res
    .cookie("token", null, {
      maxAge: 0,
    })
    .end()
}
