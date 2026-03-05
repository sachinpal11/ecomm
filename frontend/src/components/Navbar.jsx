import React, { useState } from "react";
import Logo from "../assets/flxora.png";
import { Link } from "react-router-dom";
import checkLogin from "../utils/checkLogin";
import { Handbag, Search, TextAlignJustify, X } from "lucide-react";

function Navbar() {
  const isLogin = checkLogin();
  const [menuOpen, setMenuOpen] = useState(false);

  const NavUrl = [
    { title: "WOMEN", Url: "/women" },
    { title: "MEN", Url: "/men" },
    { title: "NEW COLLECTION", Url: "/new-collection" },
    { title: "ABOUT", Url: "/about" },
  ];

  return (
    <>
      {/* Navbar */}
      <div className="fixed z-50 top-0 flex items-center px-6 md:px-20 justify-between w-full h-20">
        {/* Logo */}
        <Link to="/" className="flex items-center justify-center">
          <img src={Logo} alt="flxora_logo" width={180} />
        </Link>

        {/* Desktop Navigation */}
        <ul className="hidden md:flex gap-10">
          {NavUrl.map((item, index) => (
            <Link
              to={item.Url}
              key={index}
              className="text-white hover:text-neutral-300"
            >
              {item.title}
            </Link>
          ))}
        </ul>

        {/* Desktop Icons */}
        <div className="hidden md:flex gap-6 text-white">
          {isLogin ? (
            <>
              <Search className="cursor-pointer" />
              <Handbag className="cursor-pointer" />
            </>
          ) : (
            <Link
              to="/signup"
              className="border px-4 py-2 rounded hover:bg-neutral-700"
            >
              Sign Up
            </Link>
          )}
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden text-white">
          <TextAlignJustify
            size={28}
            className="cursor-pointer"
            onClick={() => setMenuOpen(true)}
          />
        </div>
      </div>

      {/* Background Overlay */}
      <div
        onClick={() => setMenuOpen(false)}
        className={`fixed inset-0 bg-black/50 transition-opacity duration-300 md:hidden ${
          menuOpen ? "opacity-100 visible" : "opacity-0 invisible"
        }`}
      />

      {/* Right Slide Menu */}
      <div
        className={`fixed top-0 right-0 h-full w-72 bg-black text-white transform transition-transform duration-300 z-50 md:hidden ${
          menuOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* Close Button */}
        <div className="flex justify-end p-6">
          <X
            size={28}
            className="cursor-pointer"
            onClick={() => setMenuOpen(false)}
          />
        </div>

        {/* Nav Links */}
        <div className="flex flex-col gap-8 px-8 mt-10">
          {NavUrl.map((item, index) => (
            <Link
              key={index}
              to={item.Url}
              onClick={() => setMenuOpen(false)}
              className="text-lg"
            >
              {item.title}
            </Link>
          ))}

          {/* Icons / Signup */}
          {isLogin ? (
            <div className="flex gap-6 pt-6">
              <Search />
              <Handbag />
            </div>
          ) : (
            <Link
              to="/signup"
              onClick={() => setMenuOpen(false)}
              className="border px-6 py-2 rounded text-center"
            >
              Sign Up
            </Link>
          )}
        </div>
      </div>
    </>
  );
}

export default Navbar;
