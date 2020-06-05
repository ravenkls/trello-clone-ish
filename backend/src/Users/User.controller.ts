import express = require("express");
import { validateDto } from "../middlewares/validateDto";
import { authCredentialsDto } from "./userCredentials.dto";
import bcrypt = require("bcryptjs");
import jwt = require("jsonwebtoken");

import { User } from "./User.entity";
import { verifyJwtToken } from "../middlewares/verifyJwtToken";

const UserController: express.Router = express.Router();

UserController.post(
  "/signup",
  validateDto(authCredentialsDto),
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

    return res.status(201).json({
      userId: `${user.id}`,
      username: `${user.username}`,
    });
  },
);

UserController.post(
  "/signin",
  validateDto(authCredentialsDto),
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
        expiresIn: "6000s",
      },
    );
    res.status(200).json({ accessToken: accessToken });
  },
);

UserController.get(
  "/signin",
  verifyJwtToken,
  (req: express.Request, res: express.Response): express.Response => {
    return res.status(200).send("hooray you have a valid jwt");
  },
);

export { UserController };
