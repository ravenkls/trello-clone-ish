if (process.env.NODE_ENV === "development") require("dotenv").config();

const typeormConfig = {
  type: "postgres",
  host: process.env["DB_HOST"],
  port: process.env["DB_PORT"],
  username: process.env["DB_USERNAME"],
  password: process.env["DB_PASSWORD"],
  database: process.env["DB_NAME"],
  synchronize: process.env["TYPEORM_SYNC"],
  entities: ["src/entities/**/**.*.ts"],
};

module.exports = typeormConfig;
