import express = require("express");
import { Team } from "./Team.entity";
import { User } from "../Users/User.entity";
import { getConnection } from "typeorm";

const TeamController: express.Router = express.Router();

TeamController.post(
  "/create",
  async (req: express.Request, res: express.Response) => {
    const team = Team.create();
    team.teamname = req.body.teamname;

    const user = await getConnection()
      .createQueryBuilder()
      .select("user")
      .from(User, "user")
      .where("user.id = :id", { id: req.jwtDecode.userId })
      .leftJoinAndSelect("user.teams", "team")
      .getOne();

    console.log(user);
    if (!user.teams) {
      user.teams = [team];
    } else {
      user.teams.push(team);
    }

    try {
      await team.save();
    } catch (err) {
      if (err.code === "23505") {
        return res.status(409).send("team name already taken");
      }
    }

    await user.save();

    return res.status(201).json(team);
  },
);

export { TeamController };
