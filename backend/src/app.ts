import express = require("express");
import bodyParser = require("body-parser");
import { UserController } from "./Users/User.controller";
import { TasksController } from "./Tasks/Task.controller";
import { TeamController } from "./Teams/Team.controller";
import { verifyJwtToken } from "./middlewares/verifyJwtToken";

const session = require("express-session");
const redis = require("redis");
const redisClient = redis.createClient();
const redisStore = require("connect-redis")(session);

const app: express.Application = express();

app.use(bodyParser.json());
app.use(
  session({
    secret: process.env.REDIS_SECRETKEY,
    store: new redisStore({
      host: process.env.REDIS_HOST,
      port: process.env.REDIS_PORT,
      client: redisClient,
    }),
    cookie: {
      maxAge: 10000 * 6,
    },
    saveUninitialized: false,
    resave: false,
  }),
);

app.use("/users", UserController);
app.use("/tasks", verifyJwtToken, TasksController);
app.use("/teams", verifyJwtToken, TeamController);

export { app };
