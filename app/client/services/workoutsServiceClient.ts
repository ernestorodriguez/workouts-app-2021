const workoutsApiPath = "/api/workouts";

const getPage = (
  page?: number,
  startDate?: string,
  selectedCategories?: string[]
): Promise<Record<string, unknown>> => {
  let query = "";
  if (page) {
    query += `page=${page}&`;
  }

  if (startDate) {
    query += `startDate=${startDate}&`;
  }

  if (selectedCategories) {
    query += `selectedCategories=${selectedCategories}&`;
  }

  return fetch(`${workoutsApiPath}?${query}`, {
    method: "GET",
  }).then((result) => result.json());
};

const get = (alias: string): Promise<Record<string, unknown>> =>
  fetch(`${workoutsApiPath}/${alias}`, {
    method: "GET",
  }).then((result) => result.json());

const workoutsServiceClient = { getPage, get };

export default workoutsServiceClient;
