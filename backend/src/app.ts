import express = require("express");
import bodyParser = require("body-parser");
import { UserController } from "./Users/User.controller";
import { TasksController } from "./Tasks/Task.controller";
import { verifyJwtToken } from "./middlewares/verifyJwtToken";

const app: express.Application = express();

app.use(bodyParser.json());

app.use("/users", UserController);
app.use("/tasks", verifyJwtToken, TasksController);

export { app };
