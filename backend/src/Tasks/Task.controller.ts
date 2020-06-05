import express from "express";
import { Task } from "./Task.entity";
import { TaskStatus } from "./TaskStatus.enum";
import { validateDto } from "../middlewares/validateDto";
import { updateTaskDto, createTaskDto } from "./Task.dto";

const TasksController: express.Router = express.Router();

TasksController.post(
  "/create",
  validateDto(createTaskDto),
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

TasksController.get(
  "/:id",
  async (
    req: express.Request,
    res: express.Response,
  ): Promise<express.Response> => {
    const task: Task = await getTaskById(parseInt(req.params.id));
    return res.status(200).json(task);
  },
);

TasksController.patch(
  "/:id",
  validateDto(updateTaskDto),
  async (
    req: express.Request,
    res: express.Response,
  ): Promise<express.Response> => {
    const task: Task = await getTaskById(parseInt(req.params.id));
    if (!task) {
      return res.status(404).send();
    }

    Object.keys(req.body).forEach((key) => {
      task[key] = req.body[key];
    });
    await task.save();

    return res.status(200).json(task);
  },
);

const getTaskById = async (taskId: number): Promise<Task> => {
  return await Task.findOne({
    where: { id: taskId },
  });
};

export { TasksController };
