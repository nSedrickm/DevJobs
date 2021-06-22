import React from 'react';
import "styles/output.css";
import LandingPage from 'pages/LandingPage';
import { Navbar, Footer } from "components";
import { Toaster } from 'react-hot-toast';
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
      <Footer />
      <Toaster
        position="bottom-right"
      />
    </BrowserRouter>
  );
}

export default App;
