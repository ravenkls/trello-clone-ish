import express from "express";
import { Task } from "./Task-entity";
import { TaskStatus } from "./TaskStatus-enum";
import { generateValidateDtoMiddleware } from "../middlewares/generateValidateDtoMiddleware";
import { createTaskDto } from "./Task-dto";
import { User } from "../Users/User-entity";
import { response } from "../utils/response-util";
import { asyncMiddlewareWrapper } from "../utils/asyncMiddlewareWrapper";

const TasksController: express.Router = express.Router();

TasksController.post(
  "/",
  generateValidateDtoMiddleware(createTaskDto),
  asyncMiddlewareWrapper(
    async (
      req: express.Request,
      res: express.Response,
    ): Promise<express.Response> => {
      const task: Task = Task.create();

      task.title = req.body.title;
      task.description = req.body.description;
      task.status = TaskStatus.OPEN;
      task.user = await User.findOne({ id: req.session.userId });

      await task.save();

      delete task.user.password;
      delete task.user.salt;

      return response(res, 201, { success: true, data: [task] });
    },
  ),
);

TasksController.get(
  "/:id",
  asyncMiddlewareWrapper(
    async (
      req: express.Request,
      res: express.Response,
    ): Promise<express.Response> => {
      const task: Task = await Task.findOne({ id: req.session.userId });
      if (!task) {
        return res.status(404).send();
      }
      delete task.user.password;
      delete task.user.salt;

      return response(res, 200, {
        success: true,
        data: [task],
      });
    },
  ),
);

export { TasksController };
