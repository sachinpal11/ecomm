import React from "react";
import { Routes, Route } from "react-router-dom";

import LandingPageLayout from "./layout/LandingPageLayout";
import LoginLayout from "./layout/LoginLayout";

import LandingPage from "./pages/LandingPage";
import Login from "./pages/Login";
import Home from "./pages/Home";
import Signup from "./pages/SignUp";
import VerificationLink from "./pages/VerificationLink";
import ResetPassword from "./pages/ResetPassword";
import ProtectedRoute from "./protectedRoute/ProtectedRoute";
import ProtectLayout from "./layout/ProtectLayout";
import { Toaster } from "react-hot-toast";
import NewCollection from "./components/NewCollection";
import AdminLayout from "./layout/AdminLayout";
import AddProduct from "./components/admin/AddProduct";
import AllProduct from "./components/admin/AllProduct";

function App() {
  return (
    <>
      <Toaster position="top-right" />
      <Routes>
        <Route element={<LoginLayout />}>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/verify-link/:token" element={<VerificationLink />} />
          <Route path="/reset-password" element={<ResetPassword />} />
        </Route>

        <Route path="/admin" element={<AdminLayout />}>
          <Route path="products" element={<AllProduct />} />
          <Route path="add-product" element={<AddProduct />} />
        </Route>

        <Route element={<LandingPageLayout />}>
          <Route path="/" element={<LandingPage />} />
        </Route>

        <Route element={<ProtectedRoute />}>
          <Route path="/home" element={<Home />} />
          <Route path="/new-collection" element={<NewCollection />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
