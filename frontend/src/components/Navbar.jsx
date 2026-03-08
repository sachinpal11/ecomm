import React, { useState, useEffect } from "react";
import Logo from "../assets/flxora.png";
import { Link } from "react-router-dom";
import { X } from "lucide-react";
import tshirt from "../assets/tshirt1_1.png";
import { motion } from "framer-motion";

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [hoverImage, setHoverImage] = useState(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [scrolled, setScrolled] = useState(false);

  const IMAGE_W = 180;
  const IMAGE_H = 260;

  const NavUrl = [
    { title: "WOMEN", url: "/women", image: tshirt },
    { title: "MEN", url: "/men", image: tshirt },
    { title: "NEW COLLECTION", url: "/new-collection", image: tshirt },
    { title: "ABOUT", url: "/about", image: tshirt },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      {/* NAVBAR */}
      <div
        className={`fixed top-0 left-0 w-full h-20 flex items-center justify-center z-30 transition-all duration-300 ${
          scrolled ? "bg-black/30 backdrop-blur-lg shadow-lg" : "bg-transparent"
        }`}
      >
        <Link to="/">
          <img src={Logo} alt="logo" className="w-[140px] md:w-[170px]" />
        </Link>

        {/* Hamburger */}
        <div
          onClick={() => setMenuOpen(true)}
          className="absolute right-6 md:right-8 flex flex-col gap-[6px] cursor-pointer"
        >
          <span className="w-7 h-[2px] bg-white"></span>
          <span className="w-7 h-[2px] bg-white"></span>
        </div>
      </div>

      {/* MENU */}
      <div
        className={`fixed top-0 right-0 h-screen w-full bg-black text-white z-[100] transition-transform duration-500 ${
          menuOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* Close */}
        <div className="flex justify-end p-6 md:p-10">
          <X
            size={32}
            className="cursor-pointer"
            onClick={() => setMenuOpen(false)}
          />
        </div>

        <div className="flex h-full">
          {/* LINKS */}
          <div
            className="flex flex-col gap-10 md:gap-12 w-full md:w-[90%]
            text-4xl md:text-6xl
            items-center md:items-start
            md:pl-24 pt-10 md:pt-20 font-light"
          >
            {NavUrl.map((item, index) => (
              <Link
                key={index}
                to={item.url}
                onClick={() => setMenuOpen(false)}
                onMouseEnter={() => setHoverImage(item.image)}
                onMouseLeave={() => setHoverImage(null)}
                className="hover:text-neutral-400 transition"
              >
                {item.title}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

export default Navbar;
