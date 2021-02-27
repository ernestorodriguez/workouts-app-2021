import * as WDBS from "./workoutsDbService";
import sequelize from "sequelize";

jest.mock("../../lib/services/mySqlConnection");

import * as workoutsDbService from "./workoutsDbService";
import { Config, GetOptions } from "./workoutsDbService";
import mySqlConnection from "./mySqlConnection";
describe("workoutsDbService", () => {
  let getSpy: jest.SpyInstance;
  it("should have getPage and get functions defined", () => {
    expect(typeof WDBS.getByColumn).toBe("function");
    expect(typeof WDBS.get).toBe("function");
  });

  describe("#getByColumn", () => {
    afterEach(() => {
      getSpy.mockRestore();
    });
    it("should call mySqlConnection.query with valid params", async () => {
      getSpy = jest
        .spyOn(mySqlConnection, "query")
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        .mockImplementation(() => {
          return Promise.resolve({ response: {} });
        });

      const config: Config = {
        table: "table_name",
        columns: ["column_name"],
        replacements: {
          start_date: "a",
          thumbnail_default: "b",
          thumbnail_medium: "c",
          thumbnail_high: "d",
          video_id: "e",
        },
      };

      const response = await WDBS.getByColumn(config, "column", "value");
      expect(response).toEqual({ response: {} });
      expect(
        getSpy
      ).toBeCalledWith(
        "SELECT column_name FROM table_name WHERE table_name.column = 'value'",
        { type: sequelize.QueryTypes.SELECT }
      );
    });
  });
  describe("#getByColumn", () => {
    afterEach(() => {
      getSpy.mockRestore();
    });
    it("should call mySqlConnection.query without start and end values", async () => {
      const queryResult = "queryResult";
      const sqlResponse = [{ "COUNT(*)": queryResult }];
      const getSpy: jest.SpyInstance = jest
        .spyOn(mySqlConnection, "query")
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        .mockImplementation(() => {
          return Promise.resolve(sqlResponse);
        });

      const options: GetOptions = {
        table: "table_name",
        columns: ["table_column", "table_column2"],
        replacements: {
          start_date: "a",
          thumbnail_default: "b",
          thumbnail_medium: "c",
          thumbnail_high: "d",
          video_id: "e",
        },
        startDate: "2020-03",
        selectedCategories: "c1,c3,c5",
      };

      const response = await WDBS.get(options);

      expect(response).toEqual({ data: sqlResponse, results: queryResult });
      expect(getSpy).toBeCalledTimes(2);
      expect(getSpy).toHaveBeenNthCalledWith(
        1,
        'SELECT table_column, table_column2 FROM table_name WHERE month(start_date)=3 AND year(start_date)=2020 AND category IN ("c1","c3","c5")',
        { type: sequelize.QueryTypes.SELECT }
      );
      expect(getSpy).toHaveBeenNthCalledWith(
        2,
        'SELECT COUNT(*) FROM table_name WHERE month(start_date)=3 AND year(start_date)=2020 AND category IN ("c1","c3","c5")',
        { type: sequelize.QueryTypes.SELECT }
      );
    });

    it("should call mySqlConnection.query without columns end and SelectedCategories", async () => {
      const queryResult = "queryResult";
      const sqlResponse = [{ "COUNT(*)": queryResult }];
      const getSpy: jest.SpyInstance = jest
        .spyOn(mySqlConnection, "query")
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        .mockImplementation(() => {
          return Promise.resolve(sqlResponse);
        });

      const options: GetOptions = {
        table: "table_name",
        replacements: {
          start_date: "a",
          thumbnail_default: "b",
          thumbnail_medium: "c",
          thumbnail_high: "d",
          video_id: "e",
        },
        startDate: "2020-03",
        start: 20,
      };

      const response = await WDBS.get(options);

      expect(response).toEqual({ data: sqlResponse, results: queryResult });
      expect(getSpy).toBeCalledTimes(2);
      expect(getSpy).toHaveBeenNthCalledWith(
        1,
        "SELECT * FROM table_name WHERE month(start_date)=3 AND year(start_date)=2020 LIMIT 20",
        { type: sequelize.QueryTypes.SELECT }
      );
      expect(getSpy).toHaveBeenNthCalledWith(
        2,
        "SELECT COUNT(*) FROM table_name WHERE month(start_date)=3 AND year(start_date)=2020",
        { type: sequelize.QueryTypes.SELECT }
      );
    });
    it("should call mySqlConnection.query only with table replacements start and end", async () => {
      const queryResult = "queryResult";
      const sqlResponse = [{ "COUNT(*)": queryResult }];
      const getSpy: jest.SpyInstance = jest
        .spyOn(mySqlConnection, "query")
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        .mockImplementation(() => {
          return Promise.resolve(sqlResponse);
        });

      const options: GetOptions = {
        table: "table_name",
        replacements: {
          start_date: "a",
          thumbnail_default: "b",
          thumbnail_medium: "c",
          thumbnail_high: "d",
          video_id: "e",
        },
        start: 20,
        end: 40,
      };

      const response = await WDBS.get(options);

      expect(response).toEqual({ data: sqlResponse, results: queryResult });
      expect(getSpy).toBeCalledTimes(2);
      expect(getSpy).toHaveBeenNthCalledWith(
        1,
        "SELECT * FROM table_name LIMIT 20, 40",
        { type: sequelize.QueryTypes.SELECT }
      );
      expect(getSpy).toHaveBeenNthCalledWith(
        2,
        "SELECT COUNT(*) FROM table_name",
        { type: sequelize.QueryTypes.SELECT }
      );
    });

  });
});
