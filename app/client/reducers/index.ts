import { combineReducers } from "redux";
import gallery from "./galleryReducer";
import itemDetail from "./itemDetailReducer";

const rootReducer = combineReducers({
  gallery,
  itemDetail,
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
