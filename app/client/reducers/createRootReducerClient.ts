import { combineReducers, Reducer, CombinedState } from "redux";
import { connectRouter, RouterState } from "connected-react-router";
import gallery, { GalleryState } from "./galleryReducer";
import itemDetail, { ItemDetailState } from "./itemDetailReducer";
import { History } from "history";



const createRootReducer = (
  history: History
): Reducer<
  CombinedState<{
    itemDetail: ItemDetailState;
    gallery: GalleryState;
    router: RouterState;
  }>
> =>
  combineReducers({
    router: connectRouter(history),
    gallery,
    itemDetail,
  });

export default createRootReducer;
