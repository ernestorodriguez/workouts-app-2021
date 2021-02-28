import workoutsService from "../services/workoutsServiceClient";
import { Dispatch } from "redux";
import { GalleryAction, GalleryState } from "../reducers/galleryReducer";
import { ItemDetailState } from "../reducers/itemDetailReducer";
import { GalleryItemProps } from "../../components/Gallery/GalleryItem";

export const galleryActions = {
  GET_PAGE: "GET_PAGE",
  GET_PAGE_SUCCESS: "GET_PAGE_SUCCESS",
};

export const getGallerySuccess = (payload: GalleryState): GalleryAction => ({
  type: galleryActions.GET_PAGE_SUCCESS,
  payload,
});

export const getGalleryPage = (
  page: number,
  startDate: string | undefined,
  selectedCategories: string[] | undefined
) => (dispatch: Dispatch) => {
  workoutsService.getPage(page, startDate, selectedCategories).then((result) =>
    dispatch(
      getGallerySuccess({
        page,
        workouts: result.workouts as GalleryItemProps[],
        selectedCategories,
        totalPages: result.totalPages as number,
        totalWorkOuts: result.totalWorkOuts as number,
        startDateSelector: result.startDateSelector as Record<string, unknown>,
        startDate,
        availableCategories: result.availableCategories as string[],
      })
    )
  );
};

export const itemActions = {
  GET_ITEM: "GET_ITEM",
  GET_ITEM_SUCCESS: "GET_ITEM_SUCCESS",
};

export const getItemSuccess = (payload: ItemDetailState) => ({
  type: itemActions.GET_ITEM_SUCCESS,
  payload,
});

export const getItem = (alias: string) => (dispatch: Dispatch) => {
  workoutsService
    .get(alias)
    .then((result) =>
      dispatch(getItemSuccess(result.itemDetail as ItemDetailState))
    );
};
