import React, { ReactElement } from "react";
import View from "../../pages/notFound";
import Layout from "../../components/Layout";

interface ControllerConfig {
  url: string;
  data: Record<string, unknown>;
}

const controller = ({ data }: ControllerConfig): ReactElement => {
  return (
    <Layout
      pageId="notFound"
      title={data.title as string}
      pageDataString={JSON.stringify(data)}
    >
      <View />
    </Layout>
  );
};

export default controller;
