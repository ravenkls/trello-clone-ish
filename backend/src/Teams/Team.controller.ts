import express = require("express");
import { Team } from "./Team.entity";
import { User } from "../Users/User.entity";
import { getConnection } from "typeorm";
import { response } from "../interfaces/response.interface";

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
      .where("user.id = :id", { id: req.session.userId })
      .leftJoinAndSelect("user.teams", "team")
      .getOne();

    if (!user.teams) {
      user.teams = [team];
    } else {
      user.teams.push(team);
    }

    try {
      await team.save();
    } catch (err) {
      if (err.code === "23505") {
        const errRes: response = {
          error: {
            message: "team name already taken",
          },
        };
        return res.status(409).send(errRes);
      }
    }

    await user.save();

    const createTeamRes: response = {
      data: team,
    };
    return res.status(201).send(createTeamRes);
  },
);

export { TeamController };
