import { buildParams } from "../../utils";

const workoutsApiPath = "/api/workouts";

const getPage = (
  page?: number,
  startDate?: string,
  selectedCategories?: string[]
): Promise<Record<string, unknown>> => {
  const query = buildParams(page, startDate, selectedCategories);
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
