import express from "express";

export function serverError(
  err: Record<string, unknown>,
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
): void {
  console.error(err.stack);
  res.status(500).json({ error: 500, status: "Server error" });
}

export function notFound(
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
): void {
  res.status(404).json({ error: 404, status: "Not Found" });
}
