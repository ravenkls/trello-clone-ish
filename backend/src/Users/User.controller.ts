import express = require("express");
import { validateDto } from "../middlewares/validateDto";
import { createUserDto, signinDto, updateUserDto } from "./User.dto";
import bcrypt = require("bcryptjs");

import { response } from "../interfaces/response.interface";
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
      await saveUser(user);
    } catch (err) {
      return res.status(409).send(err);
    }

    delete user.password;
    delete user.salt;

    const createdUserRes: response = {
      data: user,
    };
    return res.status(201).send(createdUserRes);
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
  (req: express.Request, res: express.Response): express.Response => {
    return res.status(200).send();
  },
);

UserController.get(
  "/:id",
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

    const getUserRes: response = {
      data: user,
    };
    return res.status(200).json(getUserRes);
  },
);

UserController.patch(
  "/:id",
  validateDto(updateUserDto),
  async (
    req: express.Request,
    res: express.Response,
  ): Promise<express.Response> => {
    const user: User = await User.findOne({ id: parseInt(req.params.id) });

    Object.keys(req.body).forEach(async (key) => {
      if (key === "password") {
        user.salt = await bcrypt.genSalt();
        user.password = req.body[key];
      } else {
        user[key] = req.body[key];
      }
    });

    try {
      await saveUser(user);
    } catch (err) {
      return res.status(409).send(err);
    }

    delete user.password;
    delete user.salt;

    const patchedUserRes: response = {
      data: user,
    };
    return res.status(200).send(patchedUserRes);
  },
);

const saveUser = async (user: User): Promise<void> => {
  try {
    await user.save();
  } catch (err) {
    if (err.code === "23505") {
      const duplicateKey = err.detail.match(/\((.*?)\)/)[1];
      const errResponse: response = {
        error: {
          message: `${duplicateKey} already taken`,
        },
      };
      throw errResponse;
    }
  }
};

export { UserController };
