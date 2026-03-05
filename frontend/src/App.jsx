import React from "react";
import { Routes, Route } from "react-router-dom";
import LandingPageLayout from "./layout/LandingPageLayout";
import Home from "./pages/Home";
import LandingPage from "./pages/LandingPage";

function App() {
  return (
    <Routes>
      <Route element={<LandingPageLayout />}>
        <Route path="/" element={<LandingPage />} />
      </Route>
    </Routes>
  );
}

export default App;
