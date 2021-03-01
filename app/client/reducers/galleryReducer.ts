import { galleryActions } from "../actions";
import { GalleryItemProps } from "../../components/Gallery/GalleryItem";
import { OrderedMonthsList } from "../../server/middlewares/utils/monthSelectorList";

const { GET_PAGE_SUCCESS, GET_PAGE_FETCHING } = galleryActions;

export interface GalleryState {
  workouts?: GalleryItemProps[];
  page?: number;
  startDate?: string;
  selectedCategories?: string[];
  totalPages?: number;
  totalWorkOuts?: number;
  startDateSelector?: OrderedMonthsList;
  availableCategories?: string[];
}

export interface GalleryAction {
  type: string;
  payload: GalleryState;
}

const actions = {
  [GET_PAGE_FETCHING](state: GalleryState) {
    return state;
  },
  [GET_PAGE_SUCCESS](state: GalleryState, action: GalleryAction) {
    return {
      ...state,
      ...action.payload,
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
): GalleryState => {
  const performAction = actions[action.type] || actions.defaultAction;
  return performAction(state, action);
};

export default galleryReducer;
