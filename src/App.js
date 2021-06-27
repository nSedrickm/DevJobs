import React from 'react';
import "styles/output.css";
import { Toaster } from 'react-hot-toast';
import { BrowserRouter } from "react-router-dom";
import { UserProvider } from 'pages/UserContext';

function App() {
  return (
    <div className="bg-white lg:bg-gray-100">
      <BrowserRouter>
        <Toaster
          position="top-center"
          toastOptions={{
            className: 'md:mt-8',
            duration: 5000
          }}
        />
        <UserProvider />
      </BrowserRouter>
    </div>
  );
}


export default App;
