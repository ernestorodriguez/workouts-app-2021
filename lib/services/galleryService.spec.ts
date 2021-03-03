import galleryService from "./galleryService";
import workoutsService from "./workoutsService";
import * as monthSelectorList from "../../app/server/middlewares/utils/monthSelectorList";

describe("galleryService", () => {
  const now = Date.now();
  const getMonthSelectorListMockResponse = { All: "" };
  const mockResponse = {
    data: ["workout", "workout"],
    results: 30,
  };

  const availableCategories = ["c1", "c2", "c3", "c4", "c5", "c6", "c7"];

  let nowSpy: jest.SpyInstance;
  let getMonthSelectorListSpy: jest.SpyInstance;
  let getItemListSpy: jest.SpyInstance;

  beforeEach(() => {
    nowSpy = jest.spyOn(Date, "now").mockImplementation(() => now);
    getMonthSelectorListSpy = jest.spyOn(monthSelectorList, "default");
    getItemListSpy = jest.spyOn(workoutsService, "getItemList");

    getMonthSelectorListSpy.mockImplementation(
      () => getMonthSelectorListMockResponse
    );
    getItemListSpy.mockImplementation(() => Promise.resolve(mockResponse));
  });

  afterEach(() => {
    nowSpy.mockClear();
    getMonthSelectorListSpy.mockClear();
    getItemListSpy.mockClear();
  });

  it("should call workoutsService.getItemList with valid params", async () => {
    const result = await galleryService({
      page: 2,
      startDate: "2021-03",
      selectedCategories: "c1,c7",
    });

    expect(nowSpy).toBeCalled();
    expect(getMonthSelectorListSpy).toBeCalledWith(new Date(now));
    expect(result.availableCategories).toEqual(availableCategories);
    expect(result.page).toEqual(2);
    expect(result.selectedCategories).toEqual(["c1", "c7"]);
    expect(result.startDate).toEqual("2021-03");
    expect(result.startDateSelector).toEqual(getMonthSelectorListMockResponse);
    expect(result.totalPages).toEqual(2);
    expect(result.totalWorkOuts).toEqual(30);
    expect(result.workouts).toEqual(mockResponse.data);
  });

  it("should call workoutsService.getItemList with valid params if params are not defined", async () => {
    const result = await galleryService({});

    expect(result.availableCategories).toEqual(availableCategories);
    expect(result.page).toEqual(1);
    expect(result.selectedCategories).toEqual([]);
    expect(result.startDate).toEqual(undefined);
    expect(result.startDateSelector).toEqual(getMonthSelectorListMockResponse);
    expect(result.totalPages).toEqual(2);
    expect(result.totalWorkOuts).toEqual(30);
    expect(result.workouts).toEqual(mockResponse.data);
  });
});
