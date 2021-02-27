import {
  Replacements,
  get,
  getByColumn,
  Config,
  GetOptions,
  GetResponse,
} from "./workoutsDbService";

const table = "workouts_calendar";
const amountByPage = 20;

const columns = [
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
];

const replacements: Replacements = {
  start_date: "startDate",
  thumbnail_default: "thumbnailDefault",
  thumbnail_medium: "thumbnailMedium",
  thumbnail_high: "thumbnailHigh",
  video_id: "videoId",
};

const getWorkouts = (
  page: number,
  startDate?: string,
  selectedCategories?: string
): Promise<GetResponse> => {
  let currentPage = page;

  if (page < 1) {
    currentPage = 1;
  }

  const max = amountByPage * currentPage;

  const options: GetOptions = {
    table,
    columns,
    replacements,
    start: max - amountByPage,
    end: amountByPage,
    startDate,
    selectedCategories,
  };
  return get(options);
};

const getWorkoutByColumnValue = (
  column: string,
  value: string
): Promise<any> => {
  const config: Config = {
    table,
    columns,
    replacements,
  };

  return getByColumn(config, column, value).then(
    (response: any) => response[0]
  );
};

const workoutsService = {
  getPage: getWorkouts,
  get: getWorkoutByColumnValue,
};

export default workoutsService;
