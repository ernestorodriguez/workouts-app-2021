import React, { ReactElement } from "react";
import Header from "../../components/Header";

const NotFound = (): ReactElement => (
  <div className="notfound">
    <Header />
    <h1 className="not-found__title">
      404! <br />
      <small className="not-found__title--lighter">Something is missing</small>
    </h1>
  </div>
);

export default NotFound;
