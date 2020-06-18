import express = require("express");
import bodyParser = require("body-parser");
import { UserController } from "./Users/User.controller";
import { TasksController } from "./Tasks/Task.controller";
import { TeamController } from "./Teams/Team.controller";
import { verifyLoginSession } from "./middlewares/verifyLoginSession";

const session = require("express-session");
const redis = require("redis");
const redisClient = redis.createClient();
const redisStore = require("connect-redis")(session);

const app: express.Application = express();

// ENABLE CORS REQUESTS
app.use(function (req, res, next) {
  console.log(req.headers.origin);
  res.set("Access-Control-Allow-Origin", process.env.FRONTEND_HOST);
  res.set("Access-Control-Allow-Credentials", "true");
  res.set(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept",
  );
  next();
});

app.use(bodyParser.json());

app.use(
  session({
    secret: process.env.REDIS_SECRETKEY,
    store: new redisStore({
      host: process.env.REDIS_HOST,
      port: process.env.REDIS_PORT,
      client: redisClient,
      ttl: 60,
    }),
    saveUninitialized: false,
    resave: false,
  }),
);

app.use(verifyLoginSession);

app.use("/users", UserController);
app.use("/tasks", TasksController);
app.use("/teams", TeamController);

export { app };
