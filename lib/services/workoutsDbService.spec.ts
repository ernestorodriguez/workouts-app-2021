const mock = jest.createMockFromModule("./mySqlConnection");
import * as mySqlConnectionModule from "./mySqlConnection";
import { Config, GetOptions } from "./workoutsDbService";
import * as WDBS from "./workoutsDbService";
import sequelize from "sequelize";

const replacements = {
  start_date: "a",
  thumbnail_default: "b",
  thumbnail_medium: "c",
  thumbnail_high: "d",
  video_id: "e",
};
describe("workoutsDbService", () => {
  let querySpy: jest.SpyInstance;
  let getSqlConnection: jest.SpyInstance;
  beforeEach(() => {
    querySpy = jest.fn();
    getSqlConnection = jest
      .spyOn(mySqlConnectionModule, "getSqlConnection")
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      .mockImplementation(() => {
        return {
          query: querySpy,
        };
      });
  });

  it("should have getPage and get functions defined", () => {
    expect(typeof WDBS.getByColumn).toBe("function");
    expect(typeof WDBS.get).toBe("function");
  });

  describe("#getByColumn", () => {
    it("should call mySqlConnection.query with valid params", async () => {
      querySpy.mockImplementation(() => {
        return Promise.resolve({ response: {} });
      });

      const config: Config = {
        table: "table_name",
        columns: ["column_name"],
        replacements,
      };

      const response = await WDBS.getByColumn(config, "column", "value");
      expect(response).toEqual({ response: {} });
      expect(
        querySpy
      ).toBeCalledWith(
        "SELECT column_name FROM table_name WHERE table_name.column = 'value'",
        { type: sequelize.QueryTypes.SELECT }
      );
    });
  });
  describe("#get", () => {
    const queryResult = "queryResult";
    const sqlResponse = [{ "COUNT(*)": queryResult }];

    beforeEach(() => {
      querySpy.mockImplementation(() => {
        return Promise.resolve(sqlResponse);
      });
    });

    it("if all params are present should call mySqlConnection.query with valid query", async () => {
      const options: GetOptions = {
        table: "table_name",
        columns: ["table_column", "table_column2"],
        replacements,
        startDate: "2020-03",
        selectedCategories: "c1,c3,c5",
        start: 20,
        end: 40,
      };

      const response = await WDBS.get(options);

      expect(response).toEqual({ data: sqlResponse, results: queryResult });
      expect(querySpy).toBeCalledTimes(2);
      expect(querySpy).toHaveBeenNthCalledWith(
        1,
        'SELECT table_column, table_column2 FROM table_name WHERE month(start_date)=3 AND year(start_date)=2020 AND category IN ("c1","c3","c5") LIMIT 20, 40',
        { type: sequelize.QueryTypes.SELECT }
      );
      expect(querySpy).toHaveBeenNthCalledWith(
        2,
        'SELECT COUNT(*) FROM table_name WHERE month(start_date)=3 AND year(start_date)=2020 AND category IN ("c1","c3","c5")',
        { type: sequelize.QueryTypes.SELECT }
      );
    });

    it("without columns, end, and SelectedCategories should call mySqlConnection.query with valid query", async () => {
      const options: GetOptions = {
        table: "table_name",
        replacements: replacements,
        startDate: "2020-03",
        start: 20,
      };

      const response = await WDBS.get(options);

      expect(response).toEqual({ data: sqlResponse, results: queryResult });
      expect(querySpy).toBeCalledTimes(2);
      expect(querySpy).toHaveBeenNthCalledWith(
        1,
        "SELECT * FROM table_name WHERE month(start_date)=3 AND year(start_date)=2020 LIMIT 20",
        { type: sequelize.QueryTypes.SELECT }
      );
      expect(querySpy).toHaveBeenNthCalledWith(
        2,
        "SELECT COUNT(*) FROM table_name WHERE month(start_date)=3 AND year(start_date)=2020",
        { type: sequelize.QueryTypes.SELECT }
      );
    });
    it("should call mySqlConnection.query only with table replacements selectedCategories, start and end", async () => {
      const queryResult = "queryResult";
      const sqlResponse = [{ "COUNT(*)": queryResult }];
      querySpy.mockImplementation(() => {
        return Promise.resolve(sqlResponse);
      });

      const options: GetOptions = {
        table: "table_name",
        replacements: replacements,
        start: 20,
        end: 40,
        selectedCategories: "c1,c3,c5",
      };

      const response = await WDBS.get(options);

      expect(response).toEqual({ data: sqlResponse, results: queryResult });
      expect(querySpy).toBeCalledTimes(2);
      expect(querySpy).toHaveBeenNthCalledWith(
        1,
        'SELECT * FROM table_name WHERE  category IN ("c1","c3","c5") LIMIT 20, 40',
        { type: sequelize.QueryTypes.SELECT }
      );
      expect(querySpy).toHaveBeenNthCalledWith(
        2,
        'SELECT COUNT(*) FROM table_name WHERE  category IN ("c1","c3","c5")',
        { type: sequelize.QueryTypes.SELECT }
      );
    });

    it("should call mySqlConnection.query without optional params", async () => {
      const options: GetOptions = {
        table: "table_name",
        replacements,
      };

      const response = await WDBS.get(options);

      expect(response).toEqual({ data: sqlResponse, results: queryResult });
      expect(querySpy).toBeCalledTimes(2);
      expect(querySpy).toHaveBeenNthCalledWith(1, "SELECT * FROM table_name", {
        type: sequelize.QueryTypes.SELECT,
      });
      expect(querySpy).toHaveBeenNthCalledWith(
        2,
        "SELECT COUNT(*) FROM table_name",
        { type: sequelize.QueryTypes.SELECT }
      );
    });
  });
});
