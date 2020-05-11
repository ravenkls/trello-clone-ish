import * as config from "config";

const dbConfig = config.get("db");

// PROD ENV VARS PROVIDED BY RDS WHEN DEPLOYED IN AWS
export const typeormConfig = {
  type: dbConfig.type,
  host: process.env.RDS_HOSTNAME || dbConfig.host,
  port: process.env.RDS_PORT || dbConfig.port,
  username: process.env.RDS_USERNAME || dbConfig.username,
  password: process.env.RDS_PASSWORD || dbConfig.password,
  database: process.env.RDS_DB_NAME || dbConfig.database,
  synchronize: process.env.TYPEORM_SYNC || dbConfig.synchronize,
  entities: ["src/entities/**/*.ts"],
};
