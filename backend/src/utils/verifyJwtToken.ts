import express = require("express");
import jwt = require("jsonwebtoken");
import config = require("config");

export const verifyJwtToken = (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction,
) => {
  const token = req.headers["authorization"];
  if (!token) return res.status(401).send("Please provide your JWT");

  try {
    jwt.verify(token, process.env.JWT_SECRETKEY);
  } catch (err) {
    return res.status(401).send("Invalid JWT");
  }

  next();
};
