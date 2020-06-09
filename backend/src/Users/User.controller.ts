import express = require("express");
import { validateDto } from "../middlewares/validateDto";
import { createUserDto, signinDto } from "./User.dto";
import bcrypt = require("bcryptjs");
import { verifyLoginSession } from "../middlewares/verifyLoginSession";

import { User } from "./User.entity";
import { getConnection } from "typeorm";

const UserController: express.Router = express.Router();

UserController.post(
  "/signup",
  validateDto(createUserDto),
  async (
    req: express.Request,
    res: express.Response,
  ): Promise<express.Response> => {
    const { username, password, email } = req.body;

    const user: User = User.create();
    user.username = username;
    user.password = password;
    user.email = email;
    user.salt = await bcrypt.genSalt();
    try {
      await user.save();
    } catch (err) {
      console.log(err);
      if (err.code === "23505") {
        return res.status(409).send("user already exists");
      }
    }

    delete user.password;
    delete user.salt;

    return res.status(201).json(user);
  },
);

UserController.post(
  "/signin",
  validateDto(signinDto),
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

    req.session.alive = true;
    req.session.userId = user.id;

    return res.status(200).send();
  },
);

UserController.get(
  "/signin",
  verifyLoginSession,
  (req: express.Request, res: express.Response): express.Response => {
    return res.status(200).send();
  },
);

UserController.get(
  "/:id",
  verifyLoginSession,
  async (
    req: express.Request,
    res: express.Response,
  ): Promise<express.Response> => {
    const user: User = await getConnection()
      .createQueryBuilder()
      .select("user")
      .from(User, "user")
      .where("user.id = :id", { id: parseInt(req.session.userId) })
      .leftJoinAndSelect("user.tasks", "task")
      .leftJoinAndSelect("user.teams", "team")
      .getOne();

    if (!user) {
      return res.status(404).send();
    }

    delete user.password;
    delete user.salt;

    return res.status(200).json(user);
  },
);

export { UserController };
