import express from "express";
import { Task } from "./Task.entity";
import { TaskStatus } from "./TaskStatus.enum";
import { validateDto } from "../middlewares/validateDto";
import { updateTaskDto, createTaskDto } from "./Task.dto";
import { response } from "../interfaces/response.interface";
import { User } from "../Users/User.entity";

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

    const createTaskRes: response = {
      data: task,
    };
    return res.status(201).send(createTaskRes);
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

    const getTaskRes: response = {
      data: task,
    };
    return res.status(200).send(getTaskRes);
  },
);

export { TasksController };
