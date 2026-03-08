import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import Navbar from "../components/admin/AdminNavbar";
import Footer from "../components/Footer";
import { useSelector } from "react-redux";

function AdminLayout() {
  const user = useSelector((state) => state.auth.user);

  if (user && !user.role === "admin") {
    return <Navigate to="/home" replace />;
  }
  return (
    <>
      <Navbar />
      <Outlet />
      <Footer />
    </>
  );
}

export default AdminLayout;
