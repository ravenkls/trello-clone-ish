import express = require("express");
import jwt = require("jsonwebtoken");
import jwtDecode = require("jwt-decode");

export const verifyJwtToken = (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction,
): express.Response | void => {
  const token = req.headers["authorization"];
  if (!token) return res.status(401).send("Please provide your JWT");

  try {
    jwt.verify(token, process.env.JWT_SECRETKEY);
  } catch (err) {
    return res.status(401).send("Invalid JWT");
  }

  // Pass decoded jwt into req body to be used by jwt protected routes
  req.body.jwtDecode = jwtDecode(token);
  next();
};
