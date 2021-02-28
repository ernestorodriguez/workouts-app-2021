import { itemActions } from "../actions";

const { GET_ITEM_SUCCESS } = itemActions;

export interface ItemDetailState {
  name?: string;
  startDate?: string;
  category?: string;
  description?: string;
}

export interface ItemDetailAction {
  type: string;
  payload?: ItemDetailState;
}

const actions = {
  // TODO ADD LOADING STATE
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
