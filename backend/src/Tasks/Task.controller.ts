import express from "express";
import { Task } from "./Task.entity";
import { TaskStatus } from "./TaskStatus.enum";
import { validateDto } from "../middlewares/validateDto";
import { createTaskDto } from "./Task.dto";
import { User } from "../Users/User.entity";
import { response } from "../utils/response.util";

const TasksController: express.Router = express.Router();

TasksController.post(
  "/create",
  validateDto(createTaskDto),
  async (
    req: express.Request,
    res: express.Response,
  ): Promise<express.Response> => {
    const task: Task = Task.create();

    console.log(req.session);
    task.title = req.body.title;
    task.description = req.body.description;
    task.status = TaskStatus.OPEN;
    task.user = await User.findOne({ id: req.session.userId });

    await task.save();

    delete task.user.password;
    delete task.user.salt;

    return response(res, 201, { success: true, data: task });
  },
);

TasksController.get(
  "/:id",
  async (
    req: express.Request,
    res: express.Response,
  ): Promise<express.Response> => {
    const task: Task = await Task.findOne({ id: parseInt(req.session.userId) });
    if (!task) {
      return res.status(404).send();
    }
    delete task.user.password;
    delete task.user.salt;

    return response(res, 200, {
      success: true,
      data: task,
    });
  },
);

export { TasksController };
