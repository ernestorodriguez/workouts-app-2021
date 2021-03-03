import WS from "./workoutsService";

jest.mock("../../lib/services/workoutsDbService");
import * as workoutsDbService from "../../lib/services/workoutsDbService";

describe("workoutsService", () => {
  it("should have getPage and getItem functions defined", () => {
    expect(typeof WS.getItemList).toBe("function");
    expect(typeof WS.getItem).toBe("function");
  });

  describe("#getItem", () => {
    it("should call workoutsDbService.getByColumn with valid params", async () => {
      const getByColumnSpy: jest.SpyInstance = jest
        .spyOn(workoutsDbService, "getByColumn")
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        .mockImplementation(() => {
          return Promise.resolve(["response"]);
        });

      const response = await WS.getItem("column", "value");

      expect(response).toEqual("response");
      expect(getByColumnSpy).toBeCalledWith(
        {
          columns: [
            "id",
            "name",
            "description",
            "start_date",
            "category",
            "alias",
            "thumbnail_default",
            "thumbnail_medium",
            "thumbnail_high",
            "video_id",
          ],
          replacements: {
            start_date: "startDate",
            thumbnail_default: "thumbnailDefault",
            thumbnail_medium: "thumbnailMedium",
            thumbnail_high: "thumbnailHigh",
            video_id: "videoId",
          },
          table: "workouts_calendar",
        },
        "column",
        "value"
      );
    });
  });

  describe("#getPage", () => {
    const getSpy: jest.SpyInstance = jest
      .spyOn(workoutsDbService, "get")
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      .mockImplementation(() => {
        return Promise.resolve("response");
      });

    const expectedResponse = {
      columns: [
        "id",
        "name",
        "description",
        "start_date",
        "category",
        "alias",
        "thumbnail_default",
        "thumbnail_medium",
        "thumbnail_high",
        "video_id",
      ],
      replacements: {
        start_date: "startDate",
        thumbnail_default: "thumbnailDefault",
        thumbnail_medium: "thumbnailMedium",
        thumbnail_high: "thumbnailHigh",
        video_id: "videoId",
      },
      selectedCategories: "c1,c3,4",
      start: 0,
      end: 20,
      startDate: "2021-02",
      table: "workouts_calendar",
    };

    afterEach(() => {
      getSpy.mockClear();
    });

    it("should call workoutsDbService.getItem with valid params", async () => {
      const response = await WS.getItemList(1, "2021-02", "c1,c3,4");
      expect(response).toEqual("response");
      expect(getSpy).toBeCalledWith(expectedResponse);
    });

    it("should have minimum page of 1", async () => {
      const response = await WS.getItemList(-1, "2021-02", "c1,c3,4");
      expect(response).toEqual("response");
      expect(getSpy).toBeCalledWith(expectedResponse);
    });
  });
});
