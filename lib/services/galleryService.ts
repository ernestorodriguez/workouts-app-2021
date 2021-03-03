import workoutsService from "./workoutsService";
import { GalleryState } from "../../app/client/reducers/galleryReducer";
import getMonthSelectorList from "../../app/server/middlewares/utils/monthSelectorList";

const availableCategories = ["c1", "c2", "c3", "c4", "c5", "c6", "c7"];

async function getGalleryData(
  page = 1,
  startDate?: string,
  selectedCategoriesString?: string
): Promise<GalleryState> {
  const response = await workoutsService.getItemList(
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

export interface GalleryQuery {
  page?: number;
  startDate?: string;
  selectedCategories?: string;
}

function galleryService({
  page,
  startDate,
  selectedCategories,
}: GalleryQuery): Promise<GalleryState> {
  return getGalleryData(page, startDate, selectedCategories);
}

export default galleryService;
