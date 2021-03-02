jest.mock("sequelize");
import { unitDB, getSqlConnection } from "./mySqlConnection";
import sequelize from "sequelize";

describe("mySqlConnection", () => {
  it("initDB method should initialize db", () => {
    const sequelizeMock = {
      authenticate: jest.fn(() => {
        return Promise.reject();
      }),
    };
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    const SequelizeSpy = jest
      .spyOn(sequelize, "Sequelize")
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      .mockReturnValue(sequelizeMock);
    unitDB();
    expect(SequelizeSpy).toBeCalledWith("DB_NAME", "DB_USER", "DB_PASS", {
      dialect: "mysql",
      host: "DB_HOST",
    });
    expect(getSqlConnection()).toEqual(sequelizeMock);
  });
});
