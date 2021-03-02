import WM from "./workoutsMiddlewares";
jest.mock("../../lib/services/workoutsService");
jest.mock("../../lib/services/galleryService");
import workoutsService from "../../lib/services/workoutsService";
import * as galleryServiceModule from "../../lib/services/galleryService";
import { NextFunction, Request, Response } from "express";

let getSpy: jest.SpyInstance;
let getPageSpy: jest.SpyInstance;

interface MockReq {
  status: jest.SpyInstance;
  json: jest.SpyInstance;
}

describe("workoutsMiddlewares", () => {
  it("should have static functions defined", () => {
    expect(typeof WM.detail).toBe("function");
    expect(typeof WM.workoutsGallery).toBe("function");
  });

  describe("detail", () => {
    let alias: string;
    // eslint-disable-next-line @typescript-eslint/ban-types
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

    // eslint-disable-next-line @typescript-eslint/ban-types
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
        .spyOn(galleryServiceModule, "default")
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        .mockImplementation(() => {
          return Promise.resolve({
            totalPages: 1,
            totalWorkOuts: 20,
            workouts: {},
          });
        });

      const next: NextFunction = jest.fn();
      await WM.workoutsGallery(
        req as Request,
        (resMock as unknown) as Response,
        next
      );
      expect(getPageSpy).toBeCalledWith({
        page: "1",
        selectedCategories: "c1,c2",
        startDate: "2020-02",
      });
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
        .spyOn(galleryServiceModule, "default")
        .mockImplementation(() => {
          return Promise.reject("SOME ERROR");
        });
      const next: NextFunction = jest.fn();
      await WM.workoutsGallery(
        req as Request,
        (resMock as unknown) as Response,
        next
      );
      expect(getPageSpy).toBeCalledWith({
        page: "1",
        selectedCategories: "c1,c2",
        startDate: "2020-02",
      });
      expect(next).toBeCalledWith("SOME ERROR");
    });
  });
});
