import React, { ReactElement } from "react";
import { Provider } from "react-redux";
import thunk from "redux-thunk";
import { StaticRouter } from "react-router";
import { createStore, applyMiddleware } from "redux";
import View from "../../pages/spa";
import Layout from "../../components/Layout";
import rootReducer from "../../client/reducers";

interface ControllerConfig {
  url: string;
  data: Record<string, unknown>;
}

const controller = ({ url, data }: ControllerConfig): ReactElement => {
  const store = createStore(rootReducer, data, applyMiddleware(thunk));
  return (
    <Layout title={data.title as string} pageDataString={JSON.stringify(data)}>
      <Provider store={store}>
        <StaticRouter location={url} context={{}}>
          <View />
        </StaticRouter>
      </Provider>
    </Layout>
  );
};

export default controller;
