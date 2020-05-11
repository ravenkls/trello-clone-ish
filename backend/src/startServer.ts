import * as config from "config";
import * as express from "express";
import { createConnection } from "typeorm";
import { typeormConfig } from "../typeormConfig";

export const startServer = async () => {
  const serverConfig = config.get("server");

  await createConnection(typeormConfig);
  const app = express();

  app.get("/", (res: express.Response) => {
    res.status(200).send();
  });

  app.listen(serverConfig.port, () =>
    console.log(`Express server listening on port ${serverConfig.port}`),
  );
};
