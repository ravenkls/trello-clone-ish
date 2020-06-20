import React from "react";
import "./App.css";
import { Register } from "./components/Register";
import { Login } from "./components/Login";
import { UserProfile } from "./components/UserProfile";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/login">
          <Login />
        </Route>

        <Route path="/register">
          <Register />
        </Route>

        <Route path="/me">
          <UserProfile />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
