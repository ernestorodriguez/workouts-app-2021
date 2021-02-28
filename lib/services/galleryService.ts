import workoutsService from "./workoutsService";
import { GalleryState } from "../../app/client/reducers/galleryReducer";
import getMonthSelectorList from "../../app/server/middlewares/utils/monthSelectorList";

const availableCategories = ["c1", "c2", "c3", "c4", "c5", "c6", "c7"];

async function getGalleryData(
  page = 1,
  startDate?: string,
  selectedCategoriesString?: string
): Promise<GalleryState> {
  const response = await workoutsService.getPage(
    page,
    startDate,
    selectedCategoriesString
  );
  let selectedCategories: string[] = [];

  if (selectedCategoriesString) {
    selectedCategories = selectedCategoriesString.split(",");
  }
  return {
    page: page,
    workouts: response.data,
    selectedCategories: selectedCategories,
    totalPages: Math.ceil(response.results / 20),
    totalWorkOuts: response.results,
    startDateSelector: getMonthSelectorList(new Date(Date.now())),
    startDate: startDate,
    availableCategories,
  };
}

function galleryService(query: Record<string, unknown>): Promise<GalleryState> {
  const page = (query.page as unknown) as number;
  const startDate: string = query.startDate as string;
  const selectedCategoriesString: string = query.selectedCategories as string;

  return getGalleryData(page, startDate, selectedCategoriesString);
}

export default galleryService;
