import express = require("express");

export const verifyLoginSession = async (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction,
) => {
  if (
    req.method === "POST" &&
    (req.path === "/users/signup" || req.path === "/users/signin")
  ) {
    console.log("signup/signin route");
    return next();
  }

  if (!req.session.alive) {
    return res
      .status(401)
      .send("Your login session has expired, please login again");
  }

  next();
};
