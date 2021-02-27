import React, { ReactElement } from "react";
import { Switch, Route } from "react-router-dom";
import Home from "../home";
import Detail from "../detail";

const View = (): ReactElement => (
  <>
    <Switch>
      <Route exact path="/" component={Home} />
      <Route path="/workouts/:alias" component={Detail} />
    </Switch>
  </>
);

export default View;
