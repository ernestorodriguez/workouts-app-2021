import { createBrowserHistory } from "history";
import { applyMiddleware, createStore, PreloadedState, Store } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import { routerMiddleware } from "connected-react-router";
import thunk from "redux-thunk";
import createRootReducer from "../reducers/createRootReducerClient";

export const history = createBrowserHistory();

export default function configureStore(
  preloadedState: PreloadedState<Record<string, unknown>>
): Store {
  const store = createStore(
    createRootReducer(history), // root reducer with router state
    preloadedState,
    composeWithDevTools(applyMiddleware(routerMiddleware(history), thunk))
  );

  return store;
}
