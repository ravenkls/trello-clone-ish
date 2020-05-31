import express from "express";
import { verifyJwtToken } from "../utils/verifyJwtToken";
import { validateDto } from "../utils/validateDto";
import { createTaskDto } from "../DTO/createTask.dto";
import { Task } from "../entities/Task.entity";
import { TaskStatus } from "../utils/TaskStatus.enum";

const taskController: express.Router = express.Router();

taskController.post(
  "/create",
  validateDto(createTaskDto),
  verifyJwtToken,
  async (req: express.Request, res: express.Response) => {
    const task: Task = Task.create();

    task.title = req.body.title;
    task.description = req.body.description;
    task.status = TaskStatus.OPEN;
    task.userId = req.body.jwtDecode.userId;

    await task.save();

    return res.status(201).json(task);
  },
);

export { taskController };
