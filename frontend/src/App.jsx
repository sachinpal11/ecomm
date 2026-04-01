import React from "react";
import { Routes, Route } from "react-router-dom";

import LandingPageLayout from "./layout/LandingPageLayout";
import LoginLayout from "./layout/LoginLayout";
import ProtectLayout from "./layout/ProtectLayout";

import LandingPage from "./pages/LandingPage";
import Login from "./pages/Login";
import Home from "./pages/Home";
import Signup from "./pages/SignUp";
import VerificationLink from "./pages/VerificationLink";
import ResetPassword from "./pages/ResetPassword";
import CategoryPage from "./pages/CategoryPage";
import ProductDetails from "./pages/ProductDetails";

import ProtectedRoute from "./protectedRoute/ProtectedRoute";
import { Toaster } from "react-hot-toast";
import AdminLayout from "./layout/AdminLayout";
import AddProduct from "./components/admin/AddProduct";
import AllProduct from "./components/admin/AllProduct";

function App() {
  return (
    <>
      <Toaster position="top-right" />
      <Routes>
        {/* Guest Routes */}
        <Route element={<LoginLayout />}>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/verify-link/:token" element={<VerificationLink />} />
          <Route path="/reset-password" element={<ResetPassword />} />
        </Route>

        {/* Home & Initial Landing Section */}
        <Route element={<LandingPageLayout />}>
          <Route path="/" element={<LandingPage />} />
        </Route>

        {/* Authenticated Application Routes */}
        <Route element={<ProtectedRoute />}>
          <Route element={<ProtectLayout />}>
            <Route path="/home" element={<Home />} />
            <Route 
              path="/men" 
              element={<CategoryPage categoryTitle="Men" categoryValue="men" />} 
            />
            <Route 
              path="/women" 
              element={<CategoryPage categoryTitle="Women" categoryValue="women" />} 
            />
            <Route 
              path="/new-collection" 
              element={<CategoryPage categoryTitle="New Collection" categoryValue="" />} 
            />
            <Route path="/product/:id" element={<ProductDetails />} />
          </Route>
        </Route>

        {/* Admin Dashboard */}
        <Route path="/admin" element={<AdminLayout />}>
          <Route path="products" element={<AllProduct />} />
          <Route path="add-product" element={<AddProduct />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
