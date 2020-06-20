import express = require("express");
import { validateDto } from "../middlewares/validateDto";
import { createUserDto, signinDto, updateUserDto } from "./User.dto";
import bcrypt = require("bcryptjs");

import { User } from "./User.entity";

import { response } from "../utils/response.util";
import { saveUser, getUserInfoById } from "./User.db-operations";

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
      return response(res, 409, { success: false, errors: [{ message: err }] });
    }

    delete user.password;
    delete user.salt;

    return response(res, 201, { success: true, data: [user] });
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
      return response(res, 401, {
        success: false,
        errors: [{ message: "Invalid credentials" }],
      });
    }

    const passwordValid = Boolean(
      (await bcrypt.hash(password, user.salt)) === user.password,
    );
    if (!passwordValid) {
      return response(res, 401, {
        success: false,
        errors: [{ message: "Invalid credentials" }],
      });
    }

    req.session.alive = true;
    req.session.userId = user.id;

    return response(res, 200, { success: true });
  },
);

UserController.get(
  "/signin",
  (req: express.Request, res: express.Response): express.Response => {
    return response(res, 200, { success: true });
  },
);

UserController.get(
  "/me",
  async (
    req: express.Request,
    res: express.Response,
  ): Promise<express.Response> => {
    const user: User = await getUserInfoById(req.session.userId);

    delete user.password;
    delete user.salt;
    return response(res, 200, { success: true, data: [user] });
  },
);

UserController.get(
  "/:id",
  async (
    req: express.Request,
    res: express.Response,
  ): Promise<express.Response> => {
    const user: User = await getUserInfoById(parseInt(req.params.id));

    if (!user) {
      return response(res, 404, {
        success: false,
        errors: [{ message: `could not find user with id ${req.params.id}` }],
      });
    }

    delete user.password;
    delete user.salt;

    return response(res, 200, { success: true, data: [user] });
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

    return response(res, 200, { success: true, data: [user] });
  },
);

export { UserController };
