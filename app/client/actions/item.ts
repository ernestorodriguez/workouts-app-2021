import workoutsService from "../services/workoutsServiceClient";
import { Dispatch } from "redux";
import {
  ItemDetailAction,
  ItemDetailState,
} from "../reducers/itemDetailReducer";

const fetchItem = (alias: string): Promise<Record<string, unknown>> => {
  return workoutsService.get(alias);
};

export const itemActions = {
  GET_ITEM: "GET_ITEM",
  GET_ITEM_SUCCESS: "GET_ITEM_SUCCESS",
  GET_ITEM_FETCHING: "GET_ITEM_FETCHING",
};

export const getItemSuccess = (payload: ItemDetailState): ItemDetailAction => ({
  type: itemActions.GET_ITEM_SUCCESS,
  payload,
});

export const fetchingItem = (payload: ItemDetailState): ItemDetailAction => ({
  type: itemActions.GET_ITEM_SUCCESS,
  payload,
});

export const getItem = (alias: string) => (
  dispatch: Dispatch,
  getState: any
): void => {
  const { itemDetail } = getState();
  if (itemDetail.alias === alias) {
    dispatch(getItemSuccess({}));
    return;
  }
  dispatch(fetchingItem({}));
  fetchItem(alias).then((result) =>
    dispatch(getItemSuccess(result.itemDetail as ItemDetailState))
  );
};
