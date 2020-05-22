import { createConnection } from "typeorm";
import typeormConfig from "../typeormConfig";
import { app } from "./app";

if (process.env.NODE_ENV === "development") require("dotenv").config();

(async () => {
  await createConnection(typeormConfig);
})();

app.listen(process.env.SERVER_PORT, () =>
  console.log(`Express app listening on port ${process.env.SERVER_PORT}`),
);
