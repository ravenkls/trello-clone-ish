import express = require("express");
import bodyParser = require("body-parser");
import { authController } from "./controllers/auth.controller";
import { taskController } from "./controllers/task.controller";

const app = express();

app.use(bodyParser.json());

app.use("/auth", authController);
app.use("/tasks", taskController);

export { app };
