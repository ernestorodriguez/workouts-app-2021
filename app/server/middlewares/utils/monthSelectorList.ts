const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

export interface OrderedMonthsList {
  All: string;
  January?: string;
  February?: string;
  March?: string;
  April?: string;
  May?: string;
  June?: string;
  July?: string;
  August?: string;
  September?: string;
  October?: string;
  November?: string;
  December?: string;
}

const getMonthSelectorList = (currentDate: Date): OrderedMonthsList => {
  const currentMont = currentDate.getMonth();
  const currentYear = currentDate.getUTCFullYear();
  const first = months.slice(0, currentMont);
  const second = months.slice(currentMont);

  const monthsOrdered = second.concat(first);
  let monthIndex = currentMont + 1;
  let yearIndex = currentYear;
  const mapList: OrderedMonthsList = {
    All: "",
  };

  type MapListKeys = keyof OrderedMonthsList;

  monthsOrdered.forEach((key) => {
    mapList[key as MapListKeys] = `${yearIndex}-${monthIndex}`;
    monthIndex += 1;
    if (monthIndex > 12) {
      monthIndex = 1;
      yearIndex += 1;
    }
  });
  return mapList;
};

export default getMonthSelectorList;
