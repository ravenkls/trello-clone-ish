import express = require("express");
import Joi = require("@hapi/joi");
import bcrypt = require("bcryptjs");
import jwt = require("jsonwebtoken");
import { validateAuthCredentials } from "../utils/validateAuthCreds";

import { User } from "../entities/User.entity";
import { verifyJwtToken } from "../utils/verifyJwtToken";

const authController: express.Router = express.Router();

authController.post(
  "/signup",
  validateAuthCredentials,
  async (
    req: express.Request,
    res: express.Response,
  ): Promise<express.Response> => {
    const { username, password } = req.body;

    const user: User = User.create();
    user.username = username;
    user.password = password;
    user.salt = await bcrypt.genSalt();
    try {
      await user.save();
    } catch (err) {
      if (err.code === "23505") {
        return res.status(409).send("user already exists");
      }
    }

    return res.status(201).send("user creation successful");
  },
);

authController.post(
  "/signin",
  validateAuthCredentials,
  async (
    req: express.Request,
    res: express.Response,
  ): Promise<express.Response> => {
    const { username, password } = req.body;

    const user = await User.findOne({ username: username });
    if (!user) {
      return res.status(401).send();
    }

    const passwordValid = Boolean(
      (await bcrypt.hash(password, user.salt)) === user.password,
    );
    if (!passwordValid) {
      return res.status(401).send();
    }

    const accessToken = jwt.sign(
      { userId: user.id, username: user.username },
      process.env.JWT_SECRETKEY,
      {
        expiresIn: "60s",
      },
    );
    res.status(200).json({ accessToken: accessToken });
  },
);

authController.get(
  "/signin",
  verifyJwtToken,
  (req: express.Request, res: express.Response) => {
    res.status(200).send("hooray you have a valid jwt");
  },
);

export { authController };
