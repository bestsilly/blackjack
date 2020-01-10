import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import MainPage from "./components/pages/MainPage";
import BlackjackPage from "./components/pages/BlackjackPage";

const Routers = () => (
  <Router>
    <Switch>
      <Route exact path="/" component={MainPage} />
      <Route path="/blackjack" component={BlackjackPage} />
    </Switch>
  </Router>
);

export default Routers;
