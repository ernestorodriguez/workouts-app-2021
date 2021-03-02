function addPage(query: string, page: number | undefined): string {
  if (page) {
    query += `page=${page}&`;
  }
  return query;
}

function addStartDate(query: string, startDate: string | undefined): string {
  if (startDate) {
    query += `startDate=${startDate}&`;
  }
  return query;
}

function addSelectedCategories(
  query: string,
  selectedCategories: string[] | undefined
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
  query = addPage(query, page);
  query = addStartDate(query, startDate);
  query = addSelectedCategories(query, selectedCategories);
  return query;
}
