import React from 'react';
import { Route, Switch, Redirect } from "react-router-dom";


import "@fortawesome/fontawesome-free/css/all.min.css";
import './App.css';
import Landing from "./views/Lading.js";
import Login from "./views/Login.js";
import Register from "./views/registration.js";
import GoogleLanding from "./views/GoogleLanding";


function App() {
  return (
    <Switch>
      <Route path="/login" component={Login} />
      <Route path="/register" component={Register} />
      <Route path="/landing" component={Landing} />
      <Route path="/google-landing" component={GoogleLanding} />
      <Redirect from="/" to="/landing" />
    </Switch>
  );
}

export default App;
