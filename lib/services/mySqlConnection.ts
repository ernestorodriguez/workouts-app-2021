import { Sequelize } from "sequelize";
import config from "config";

let sqlConnection: Sequelize;

export function unitDB(): void {
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

  sqlConnection
    .authenticate()
    .catch((error) =>
      console.error("Unable to connect to the database:", error)
    );
}

export function getSqlConnection() {
  if (!sqlConnection) {
    throw new Error("Must initialize the DB first, call unitDB()");
  }
  return sqlConnection;
}
