import React, { useState, useEffect } from "react";
import Logo from "../assets/flxora.png";
import { Link, useNavigate } from "react-router-dom";
import { X, ShoppingCart } from "lucide-react";
import tshirt from "../assets/tshirt1_1.png";
import { motion } from "framer-motion";
import checkLogin from "../utils/checkLogin";
import { useDispatch } from "react-redux";
import { logoutUser } from "../api/auth/authAPI";
import { logout } from "../api/auth/authSlice";
import toast from "react-hot-toast";

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [hoverImage, setHoverImage] = useState(null);
  const [scrolled, setScrolled] = useState(false);

  const isLoggedIn = checkLogin();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logoutUser();
      dispatch(logout());
      toast.success("Logged out successfully");
      navigate("/login");
      setMenuOpen(false);
    } catch (error) {
      toast.error("Logout failed. Please try again.");
    }
  };

  const NavUrl = [
    { title: "WOMEN", url: "/women", image: tshirt },
    { title: "MEN", url: "/men", image: tshirt },
    { title: "NEW COLLECTION", url: "/new-collection", image: tshirt },
    { title: "ABOUT", url: "/about", image: tshirt },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      {/* ================= NAVBAR ================= */}
      <div
        className={`fixed top-0 left-0 w-full h-20 flex items-center justify-center z-50 transition-all duration-300 ${
          scrolled
            ? "bg-black/40 backdrop-blur-xl border-b border-neutral-800"
            : "bg-transparent"
        }`}
      >
        {/* Logo */}
        <Link to="/">
          <img src={Logo} alt="logo" className="w-[150px] md:w-[170px]" />
        </Link>

        {/* Right Section */}
        <div className="absolute right-6 md:right-10 flex items-center gap-6">
          {isLoggedIn ? (
            <Link
              to="/cart"
              className="flex items-center gap-2 text-white hover:text-neutral-400 transition"
            >
              <ShoppingCart size={22} />
            </Link>
          ) : (
            <Link
              to="/signup"
              className="text-white border border-white px-4 py-1.5 rounded-md hover:bg-white hover:text-black transition"
            >
              Sign Up
            </Link>
          )}

          {/* Hamburger */}
          <div
            onClick={() => setMenuOpen(true)}
            className="flex flex-col gap-[6px] cursor-pointer"
          >
            <span className="w-7 h-[2px] bg-white"></span>
            <span className="w-7 h-[2px] bg-white"></span>
          </div>
        </div>
      </div>

      {/* ================= FULL MENU ================= */}
      <motion.div
        initial={{ x: "100%" }}
        animate={{ x: menuOpen ? 0 : "100%" }}
        transition={{ duration: 0.45, ease: "easeInOut" }}
        className="fixed top-0 right-0 h-screen w-full bg-black text-white z-[100]"
      >
        {/* Close Button */}
        <div className="flex justify-end p-8">
          <X
            size={34}
            className="cursor-pointer hover:text-neutral-400 transition"
            onClick={() => setMenuOpen(false)}
          />
        </div>

        {/* Menu Content */}
        <div className="flex flex-col justify-center items-center md:items-start md:pl-32 gap-8 md:gap-12 h-[80%] text-2xl md:text-4xl lg:text-5xl font-light tracking-wide">
          {NavUrl.map((item, index) => (
            <Link
              key={index}
              to={item.url}
              onClick={() => setMenuOpen(false)}
              onMouseEnter={() => setHoverImage(item.image)}
              onMouseLeave={() => setHoverImage(null)}
              className="hover:text-neutral-500 transition"
            >
              {item.title}
            </Link>
          ))}

          {/* Action Links inside menu */}
          <div className="flex flex-col md:flex-row items-center md:items-start gap-6 md:gap-10 mt-8">
            {isLoggedIn ? (
              <>
                <Link
                  to="/cart"
                  onClick={() => setMenuOpen(false)}
                  className="text-2xl md:text-3xl lg:text-4xl text-neutral-400 hover:text-white transition"
                >
                  CART
                </Link>
                <button
                  onClick={handleLogout}
                  className="text-2xl md:text-3xl lg:text-4xl text-neutral-400 hover:text-red-500 transition text-left"
                >
                  LOGOUT
                </button>
              </>
            ) : (
              <Link
                to="/signup"
                onClick={() => setMenuOpen(false)}
                className="text-3xl md:text-4xl lg:text-5xl border border-white px-6 py-2 hover:bg-white hover:text-black transition"
              >
                SIGN UP
              </Link>
            )}
          </div>
        </div>
      </motion.div>
    </>
  );
}

export default Navbar;
