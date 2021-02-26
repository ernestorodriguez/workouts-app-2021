import WM from "./workoutsMiddlewares";
jest.mock("../../lib/services/workoutsService");
import workoutsService from "../../lib/services/workoutsService";
import { NextFunction, Request, Response } from "express";
import SpyInstance = jest.SpyInstance;

let getSpy: jest.SpyInstance;
let getPageSpy: jest.SpyInstance;

interface MockReq {
  status: SpyInstance;
  json: SpyInstance;
}

describe("workoutsMiddlewares", () => {
  it("should have static functions defined", () => {
    expect(typeof WM.detail).toBe("function");
    expect(typeof WM.list).toBe("function");
  });

  describe("detail", () => {
    let alias: string;
    let req: object;
    let resMock: MockReq;

    beforeEach(() => {
      alias = "SOME ID";
      req = {
        params: {
          alias,
        },
      };

      resMock = {
        status: jest.fn(),
        json: jest.fn(),
      };
    });

    afterEach(() => {
      getSpy.mockClear();
    });

    it("should call workoutsService.get", async () => {
      getSpy = jest.spyOn(workoutsService, "get").mockImplementation(() => {
        return Promise.resolve({});
      });

      const next: NextFunction = jest.fn();
      await WM.detail(req as Request, (resMock as unknown) as Response, next);
      expect(getSpy).toBeCalledWith("alias", alias);
      expect(next).not.toBeCalled();
      expect(resMock.status).toBeCalledWith(200);
      expect(resMock.json).toBeCalledWith({ itemDetail: {} });
    });

    it("should call next if workoutsService.get have and error", async () => {
      getSpy = jest.spyOn(workoutsService, "get").mockImplementation(() => {
        return Promise.reject("SOME ERROR");
      });

      const next: NextFunction = jest.fn();
      await WM.detail(req as Request, (resMock as unknown) as Response, next);
      expect(next).toBeCalledWith("SOME ERROR");
    });
  });

  describe("list", () => {
    const page = "1";
    const startDate = "2020-02";
    const selectedCategories = "c1,c2";

    let req: object;
    let resMock: MockReq;

    beforeEach(() => {
      req = {
        query: {
          page,
          startDate,
          selectedCategories,
        },
      };

      resMock = {
        status: jest.fn(),
        json: jest.fn(),
      };
    });
    afterEach(() => {
      getPageSpy.mockClear();
    });

    it("should call workoutsService.getPage", async () => {
      getPageSpy = jest
        .spyOn(workoutsService, "getPage")
        .mockImplementation(() => {
          return Promise.resolve({ data: {}, results: 20 });
        });

      const next: NextFunction = jest.fn();
      await WM.list(req as Request, (resMock as unknown) as Response, next);
      expect(getPageSpy).toBeCalledWith(1, startDate, selectedCategories);
      expect(next).not.toBeCalled();
      expect(resMock.status).toBeCalledWith(200);
      expect(resMock.json).toBeCalledWith({
        totalPages: 1,
        totalWorkOuts: 20,
        workouts: {},
      });
    });
    it("should call next if workoutsService.getPage have and error", async () => {
      getPageSpy = jest
        .spyOn(workoutsService, "getPage")
        .mockImplementation(() => {
          return Promise.reject("SOME ERROR");
        });
      const next: NextFunction = jest.fn();
      await WM.list(req as Request, (resMock as unknown) as Response, next);
      expect(getPageSpy).toBeCalledWith(1, startDate, selectedCategories);
      expect(next).toBeCalledWith("SOME ERROR");
    });
  });
});
