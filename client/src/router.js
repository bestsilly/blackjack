import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import MainPage from "./components/pages/MainPage";
import BlackjackPage from "./components/pages/BlackjackPage";
import LeaderboardPage from "./components/pages/LeaderboardPage";

const Routers = () => (
  <Router>
    <Switch>
      <Route exact path="/" component={MainPage} />
      <Route path="/blackjack" component={BlackjackPage} />
      <Route path="/leaderboard" component={LeaderboardPage} />
    </Switch>
  </Router>
);

export default Routers;
