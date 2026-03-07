import React, { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import loginBanner from "../assets/loginBanner.png";
import { Toaster } from "react-hot-toast";
function LoginLayout() {
  const navigate = useNavigate();
  useEffect(() => {
    const storedUser = localStorage.getItem("user");

    if (!storedUser) {
      navigate("/signup");
      return;
    }
  }, [navigate]);
  return (
    <div className="w-full min-h-screen flex">
      <Toaster position="top-right" />
      {/* Banner */}
      <div className="hidden md:flex md:w-1/2">
        <img
          src={loginBanner}
          alt="flxora_login_banner"
          className="h-full w-full object-cover"
        />
      </div>

      {/* Auth Section */}
      <div className="w-full md:w-1/2 flex items-center justify-center px-6">
        <Outlet />
      </div>
    </div>
  );
}

export default LoginLayout;
