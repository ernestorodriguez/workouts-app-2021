import express from "express";

export function errorHandler(
  err: Record<string, unknown>,
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
): void {
  console.error(err.stack);
  res.status(500).send("Something broke!");
}
