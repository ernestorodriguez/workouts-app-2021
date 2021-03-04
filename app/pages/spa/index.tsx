import React, { ReactElement } from "react";
import { Switch, Route } from "react-router-dom";
import Home from "../home";
import Detail from "../detail";

const View = (): ReactElement => (
  <>
    <Switch>
      <Route path="/workouts/:alias" component={Detail} />
      <Route exact path="/" component={Home} />
    </Switch>
  </>
);

export default View;
