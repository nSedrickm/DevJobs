import React from 'react';
import "styles/output.css";
import LandingPage from 'pages/LandingPage';
import { Navbar } from "components";
import { BrowserRouter, Route, Switch } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Switch>
        <Route exact path="/">
          <LandingPage />
        </Route>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
