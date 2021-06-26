import React from 'react';
import "styles/output.css";
import { Navbar, Footer } from "components";
import { Toaster } from 'react-hot-toast';
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { UserProvider } from 'pages/users/UserContext';
import LandingPage from 'pages/LandingPage';
import PasswordResetPage from 'pages/PasswordResetPage';
import JobSeekerRegistrationPage from 'pages/JobSeekerRegistrationPage';
import EmployerRegistrationPage from 'pages/EmployerRegistrationPage';

function App() {
  return (
    <div className="bg-white lg:bg-gray-100">
      <BrowserRouter>
        <Toaster
          position="top-center"
        />

        <Switch>
          <Route path="/users">
            <UserProvider />
          </Route>

          <Route path="/">
            <MainComponent />
          </Route>

        </Switch>
      </BrowserRouter>
    </div>
  );
}


const MainComponent = () => {
  return (
    <>
      <Navbar />
      <Switch>
        <Route exact path="/">
          <LandingPage />
        </Route>
        <Route exact path="/job-seeker">
          <JobSeekerRegistrationPage />
        </Route>
        <Route exact path="/employer">
          <EmployerRegistrationPage />
        </Route>
        <Route exact path="/reset-password">
          <PasswordResetPage />
        </Route>
      </Switch>
      <Footer />
    </>
  )
}

export default App;
