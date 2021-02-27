import { galleryActions } from "../actions";
import { GalleryItemProps } from "../../components/Gallery/GalleryItem";

const { GET_PAGE_SUCCESS } = galleryActions;

export interface GalleryState {
  workouts?: GalleryItemProps[];
  page?: number;
  startDate?: string;
  selectedCategories?: string[];
  totalPages?: number;
  totalWorkOuts?: number;
  startDateSelector?: Record<string, unknown>;
  availableCategories?: string[];
}

export interface GalleryAction {
  type: string;
  payload: GalleryState;
}

const actions = {
  // TODO ADD LOADING STATE
  [GET_PAGE_SUCCESS](state: GalleryState, action: GalleryAction) {
    return {
      ...state,
      page: action.payload.page,
      workouts: action.payload.workouts,
      selectedCategories: action.payload.selectedCategories,
      startDate: action.payload.startDate,
      totalPages: action.payload.totalPages,
      totalWorkOuts: action.payload.totalWorkOuts,
    };
  },

  defaultAction(state: GalleryState) {
    return state;
  },
};

const galleryReducer = (
  state: GalleryState = {},
  action: GalleryAction = {
    type: "defaultAction",
    payload: {},
  }
) => {
  const performAction = actions[action.type] || actions.defaultAction;
  return performAction(state, action);
};

export default galleryReducer;
