import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Route } from "react-router-dom";

import "./teleporthq/style.module.css";
import Home from "./teleporthq/pages/home";
import Menu from "./components/menu";
import UidlPlayground from "./components/uidlPlayground";

const App = () => {
  return (
    <Router>
      <Menu />
      <Route exact component={Home} path="/" />
      <Route exact component={UidlPlayground} path="/uidl" />
    </Router>
  );
};

ReactDOM.render(<App />, document.getElementById("app"));
