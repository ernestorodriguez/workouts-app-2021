function addPage(page: number | undefined, query: string): string {
  if (page) {
    query += `page=${page}&`;
  }
  return query;
}

function addStartDate(startDate: string | undefined, query: string): string {
  if (startDate) {
    query += `startDate=${startDate}&`;
  }
  return query;
}

function addSelectedCategories(
  selectedCategories: string[] | undefined,
  query: string
): string {
  if (selectedCategories) {
    query += `selectedCategories=${selectedCategories}&`;
  }
  return query;
}

export function buildParams(
  page: number | undefined,
  startDate: string | undefined,
  selectedCategories: string[] | undefined
): string {
  let query = "";
  query = addPage(page, query);
  query = addStartDate(startDate, query);
  query = addSelectedCategories(selectedCategories, query);
  return query;
}
