import React from 'react';
import { Route, Switch, Redirect } from "react-router-dom";


import "@fortawesome/fontawesome-free/css/all.min.css";
import './App.css';
import Landing from "./views/Lading.js";
import Login from "./views/Login.js";
import Register from "./views/registration.js";
import GoogleLanding from "./views/GoogleLanding";
import WeeklyDiet from "./components/weekly-diet/weekly.diet.jsx";
import DinerWine from "./components/diner-wine/diner-wine.jsx";
import Tracking from "./components/tracking/tracking.jsx";
import Fridge from "./components/check-fridge/check-fridge.jsx";

function App() {
  return (
    <Switch>
      <Route path="/login" component={Login} />
      <Route path="/register" component={Register}/>
      <Route path="/diet" component={WeeklyDiet}/>
      <Route path="/fridge" component={Fridge} />
      <Route path="/diner" component={DinerWine} />
      <Route path="/tracking" component={Tracking} />
      <Route path="/landing" component={Landing} />
      <Route path="/google-landing" component={GoogleLanding} />
      <Redirect from="/" to="/landing" />
    </Switch>
  );
}

export default App;
