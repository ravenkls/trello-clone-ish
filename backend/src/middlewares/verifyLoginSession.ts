import express = require("express");
import { response } from "../utils/response-util";
export const verifyLoginSession = async (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction,
) => {
  if (
    (req.method === "POST" || req.method === "OPTIONS") &&
    (req.path === "/users/signup" || req.path === "/users/signin")
  ) {
    return next();
  }

  if (!req.session.alive) {
    return response(res, 401, {
      success: false,
      errors: [{ message: "Invalid login session, please login" }],
    });
  }

  next();
};
