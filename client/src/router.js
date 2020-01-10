import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import MainPage from "./components/page/MainPage";

const Routers = () => (
  <Router>
    <Route path="/" component={MainPage} />
  </Router>
);

export default Routers;
