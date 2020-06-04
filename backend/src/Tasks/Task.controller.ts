import express from "express";
import { Task } from "./Task.entity";
import { TaskStatus } from "./TaskStatus.enum";

const TasksController: express.Router = express.Router();

TasksController.post(
  "/create",
  async (
    req: express.Request,
    res: express.Response,
  ): Promise<express.Response> => {
    const task: Task = Task.create();

    task.title = req.body.title;
    task.description = req.body.description;
    task.status = TaskStatus.OPEN;
    task.userId = req.jwtDecode.userId;

    await task.save();

    return res.status(201).json(task);
  },
);

TasksController.patch(
  "/:id",
  async (req: express.Request, res: express.Response) => {
    console.log("ping");
  },
);

export { TasksController };
