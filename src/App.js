import React from 'react';
import "styles/output.css";
import LandingPage from 'pages/LandingPage';
import SignUpPage from 'pages/SignUpPage';
import LogInPage from 'pages/LogInPage';
import RoleSelectPage from 'pages/RoleSelectPage';

import { Navbar, Footer } from "components";
import { Toaster } from 'react-hot-toast';
import { BrowserRouter, Route, Switch } from "react-router-dom";

function App() {
  return (
    <div className="bg-gray-100">
      <BrowserRouter>
        <Navbar />
        <Switch>
          <Route exact path="/">
            <LandingPage />
          </Route>
          <Route exact path="/signup">
            <SignUpPage />
          </Route>
          <Route exact path="/login">
            <LogInPage />
          </Route>
          <Route exact path="/role">
            <RoleSelectPage />
          </Route>
        </Switch>
        <Footer />
        <Toaster
          position="bottom-right"
        />
      </BrowserRouter>
    </div>
  );
}

export default App;
