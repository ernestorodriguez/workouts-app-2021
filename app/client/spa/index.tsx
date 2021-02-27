import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { ConnectedRouter } from "connected-react-router";
import View from "../../pages/spa";
import configureStore, { history } from "./configureStore";

import styles from "../../pages/spa/styles.scss";

declare global {
  interface Window {
    __PRELOADED_STATE__: any;
  }
}

const { itemDetail, gallery, title } = window.__PRELOADED_STATE__;

const store = configureStore({ itemDetail, gallery, title });

ReactDOM.hydrate(
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <View />
    </ConnectedRouter>
  </Provider>,
  document.getElementById("root-app")
);
