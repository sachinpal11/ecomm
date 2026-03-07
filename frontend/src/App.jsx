import React from "react";
import { Routes, Route } from "react-router-dom";

import LandingPageLayout from "./layout/LandingPageLayout";
import LoginLayout from "./layout/LoginLayout";

import LandingPage from "./pages/LandingPage";
import Login from "./pages/Login";
import Home from "./pages/Home";
import Signup from "./pages/SignUp";
import VerificationLink from "./pages/VerificationLink";
import ProtectedRoute from "./protectedRoute/ProtectedRoute";

function App() {
  return (
    <Routes>
      <Route element={<LoginLayout />}>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/verify-link/:token" element={<VerificationLink />} />
      </Route>

      <Route element={<LandingPageLayout />}>
        <Route path="/" element={<LandingPage />} />
      </Route>

      <Route element={<ProtectedRoute />}>
        <Route path="/home" element={<Home />} />
      </Route>
    </Routes>
  );
}

export default App;
