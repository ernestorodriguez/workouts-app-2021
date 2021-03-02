import {itemActions} from "../actions/item";

const { GET_ITEM_SUCCESS, GET_ITEM, GET_ITEM_FETCHING } = itemActions;

export interface ItemDetailState {
  name?: string;
  startDate?: string;
  category?: string;
  description?: string;
  thumbnailHigh?: string;
}

export interface ItemDetailAction {
  type: string;
  payload?: ItemDetailState;
}

const actions = {
  [GET_ITEM_FETCHING](state: ItemDetailState) {
    return {};
  },

  [GET_ITEM_SUCCESS](state: ItemDetailState, action: ItemDetailAction) {
    return {
      ...state,
      ...action.payload,
    };
  },
  defaultAction(state: ItemDetailState) {
    return state;
  },
};

const itemDetailReducer = (
  state: ItemDetailState = {},
  action: ItemDetailAction = { type: "defaultAction" }
): ItemDetailState => {
  const performAction = actions[action.type] || actions.defaultAction;
  return performAction(state, action);
};

export default itemDetailReducer;
