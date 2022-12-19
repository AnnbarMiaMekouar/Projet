import React from "react";
import "./App.css";
import { Switch, Route } from "react-router-dom";
import Dashboard from "./pages/dashboard";
import Configuration from "./pages/configuration";
import Header from "./widgets/header";

function App() {
  return (
    <>
      <Header />
      <Switch>
        <Route exact path="/">
          <Dashboard />
        </Route>
        <Route path="/configuration">
          <Configuration />
        </Route>
      </Switch>
    </>
  );
}

export default App;
