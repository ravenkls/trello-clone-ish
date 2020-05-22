import express = require("express");
import bodyParser = require("body-parser");
import { authController } from "./controllers/auth.controller";

const app = express();

app.use(bodyParser.json());

app.use("/auth", authController);
app.get("/", (req, res) => {
  res.status(201).send();
});

export { app };
