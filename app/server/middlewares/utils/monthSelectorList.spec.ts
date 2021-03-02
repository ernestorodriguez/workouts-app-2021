import monthSelectorList from "./monthSelectorList";


describe("monthSelectorList", () => {
  it("should return a ordered list of months base on provided month",() => {
    const testDates = ["2021-1-7", "2021-5-13", "2021-12-3"];

    const responses = testDates.map((date) => {
      return monthSelectorList(new Date(date));
    });
    const [
      firstCallResponse,
      SecondCallResponse,
      ThirdCallResponse,
    ] = responses;
    expect(firstCallResponse).toEqual({
      All: "",
      January: "2021-1",
      February: "2021-2",
      March: "2021-3",
      April: "2021-4",
      May: "2021-5",
      June: "2021-6",
      July: "2021-7",
      August: "2021-8",
      September: "2021-9",
      October: "2021-10",
      November: "2021-11",
      December: "2021-12",
    });
    expect(SecondCallResponse).toEqual({
      All: "",
      May: "2021-5",
      June: "2021-6",
      July: "2021-7",
      August: "2021-8",
      September: "2021-9",
      October: "2021-10",
      November: "2021-11",
      December: "2021-12",
      January: "2022-1",
      February: "2022-2",
      March: "2022-3",
      April: "2022-4",
    });
    expect(ThirdCallResponse).toEqual({
      All: "",
      December: "2021-12",
      January: "2022-1",
      February: "2022-2",
      March: "2022-3",
      April: "2022-4",
      May: "2022-5",
      June: "2022-6",
      July: "2022-7",
      August: "2022-8",
      September: "2022-9",
      October: "2022-10",
      November: "2022-11",
    });
  });
});
