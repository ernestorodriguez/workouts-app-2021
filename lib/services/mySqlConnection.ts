import { Sequelize } from "sequelize";
import config from "config";

let sqlConnection = {
  query: (a: any, b: any): Promise<void> => Promise.resolve(),
  authenticate: (): Promise<void> => Promise.resolve(),
};

if (process.env.NODE_ENV !== "testing") {
  const {
    name: dbName,
    user: dbUser,
    password: dbPassword,
    host: dbHost,
  } = config.get("dataBase");

  sqlConnection = new Sequelize(dbName, dbUser, dbPassword, {
    host: dbHost,
    dialect: "mysql",
  });
}

sqlConnection
  .authenticate()
  .catch((error) => console.error("Unable to connect to the database:", error));

export default sqlConnection;
