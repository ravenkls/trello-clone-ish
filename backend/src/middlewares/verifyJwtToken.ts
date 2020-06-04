import express = require("express");
import jwt = require("jsonwebtoken");

export interface jwtDecodeInterface {
  userId: number;
  username: string;
}

export const verifyJwtToken = (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction,
): express.Response | void => {
  const token = req.headers["authorization"];
  if (!token) return res.status(401).send("Please provide your JWT");

  try {
    const decoded: any = jwt.verify(token, process.env.JWT_SECRETKEY);
    req.jwtDecode = {
      userId: decoded.userId,
      username: decoded.username,
    };
    next();
  } catch (err) {
    return res.status(401).send("Invalid JWT");
  }
};
