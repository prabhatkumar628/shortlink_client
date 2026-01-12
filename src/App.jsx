import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { AuthProvider } from "./context/AuthProvider.jsx";
import { UrlProvider } from "./context/UrlProvider.jsx";
import { AppProvider } from "./AppProvider.jsx";
import ShortUrlHome from "./components/pages/ShortUrlHome.jsx";
import { RedirectToMainUrl } from "./components/pages/RedirectToMainUrl.jsx";
import Login from "./components/pages/login/Login.jsx";
import Signup from "./components/pages/signup/Signup.jsx";

const App = () => {
  return (
    <>
      <AppProvider>
        <AuthProvider>
          <UrlProvider>
            <BrowserRouter>
              <Routes>
                <Route path="/" element={<ShortUrlHome />} />
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<Signup />} />
                <Route path="/:shortId" element={<RedirectToMainUrl />} />
              </Routes>
            </BrowserRouter>
          </UrlProvider>
        </AuthProvider>
      </AppProvider>
    </>
  );
};

export default App;
