import express = require("express");

export const verifyLoginSession = async (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction,
) => {
  if (!req.session.alive) {
    return res
      .status(401)
      .send("Your login session has expired, please login again");
  }

  next();
};
