import React from 'react';
import "styles/output.css";
import LandingPage from 'pages/LandingPage';
import { Navbar } from "components";

function App() {
  return (
    <>
      <Navbar />
      <div className="App">
        <LandingPage />
      </div>
    </>
  );
}

export default App;
