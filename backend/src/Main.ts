require("dotenv").config();
import express = require("express");

const app = express();

app.get("/", (req: express.Request) => {
  console.log("got a request");
});

app.listen(process.env.PORT, () =>
  console.log(`express app listening on port ${process.env.PORT}`),
);
