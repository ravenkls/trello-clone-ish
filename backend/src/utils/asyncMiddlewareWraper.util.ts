import express from "express";

// Deliver errors to error handler for async middlewares
export const asyncMiddlewareWrapper = (middleware) => (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction,
): Promise<void> => {
  return Promise.resolve(middleware(req, res, next)).catch((err) => next(err));
};
