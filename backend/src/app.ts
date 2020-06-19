import express = require("express");
import bodyParser = require("body-parser");
import { UserController } from "./Users/User.controller";
import { TasksController } from "./Tasks/Task.controller";
import { TeamController } from "./Teams/Team.controller";
import { verifyLoginSession } from "./middlewares/verifyLoginSession";
import { response } from "./utils/response.util";

const session = require("express-session");
const redis = require("redis");
const redisClient = redis.createClient();
const redisStore = require("connect-redis")(session);

const app: express.Application = express();

// ENABLE CORS REQUESTS
app.use(
  (
    req: express.Request,
    res: express.Response,
    next: express.NextFunction,
  ): void => {
    res.set("Access-Control-Allow-Origin", process.env.FRONTEND_HOST);
    res.set("Access-Control-Allow-Credentials", "true");
    res.set(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept",
    );
    next();
  },
);

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

app.use(
  (req: express.Request, res: express.Response, next: express.NextFunction) => {
    next({ status: 404 });
  },
);

app.use(
  (
    error: any,
    req: express.Request,
    res: express.Response,
    next: express.NextFunction,
  ): express.Response => {
    if (error.status === 404) {
      return response(res, 404, {
        success: false,
        error: { message: "Not found" },
      });
    }
    return response(res, 500, {
      success: false,
      error: { message: "Sorry, something went wrong on our end :(" },
    });
  },
);

export { app };
