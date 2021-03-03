import workoutsService from "../services/workoutsServiceClient";
import { Dispatch } from "redux";
import { GalleryAction, GalleryState } from "../reducers/galleryReducer";
import { GalleryItemProps } from "../../components/Gallery/GalleryItem";
import { OrderedMonthsList } from "../../server/middlewares/utils/monthSelectorList";

export const galleryActions = {
  GET_PAGE_FETCHING: "GET_PAGE_FETCHING",
  GET_PAGE_SUCCESS: "GET_PAGE_SUCCESS",
};

export const getGallerySuccess = (payload: GalleryState): GalleryAction => ({
  type: galleryActions.GET_PAGE_SUCCESS,
  payload,
});

export const galleryFetching = (payload: GalleryState): GalleryAction => ({
  type: galleryActions.GET_PAGE_FETCHING,
  payload,
});

const fetchGalleryData = (
  page: number,
  startDate: string | undefined,
  selectedCategories: string[] | undefined
): Promise<Record<string, unknown>> => {
  return workoutsService.getPage(page, startDate, selectedCategories);
};

export const getGalleryPage = (
  page: number,
  startDate: string | undefined,
  selectedCategories: string[] | undefined
) => (dispatch: Dispatch, getState: any): void => {
  const { gallery } = getState();

  if (
    page === gallery.page &&
    startDate === gallery.startDate &&
    selectedCategories === gallery.selectedCategories
  ) {
    dispatch(getGallerySuccess({}));
    return;
  }

  dispatch(galleryFetching({}));
  fetchGalleryData(page, startDate, selectedCategories).then((result) =>
    dispatch(
      getGallerySuccess({
        workouts: result.workouts as GalleryItemProps[],
        selectedCategories: result.selectedCategories as string[],
        totalPages: result.totalPages as number,
        totalWorkOuts: result.totalWorkOuts as number,
        startDateSelector: result.startDateSelector as OrderedMonthsList,
        availableCategories: result.availableCategories as string[],
        startDate,
        page,
      })
    )
  );
};

