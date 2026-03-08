import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  LayoutDashboard,
  Package,
  ShoppingCart,
  Users,
  Image,
  Settings,
  Menu,
  X,
} from "lucide-react";
import Logo from "../../assets/flxora.png";

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  const navItems = [
    { name: "Dashboard", icon: LayoutDashboard, path: "/admin" },
    { name: "All Products", icon: Package, path: "/admin/products" },
    { name: "Orders", icon: ShoppingCart, path: "/admin/orders" },
    { name: "Users", icon: Users, path: "/admin/users" },
    { name: "Assets", icon: Image, path: "/admin/assets" },
    { name: "Settings", icon: Settings, path: "/admin/settings" },
  ];

  return (
    <>
      {/* Navbar */}
      <nav className="fixed top-0 left-0 w-full h-20 bg-black px-6 md:px-8 flex items-center justify-between z-50">
        {/* Logo */}
        <Link to="/admin">
          <img src={Logo} alt="logo" className="w-[140px] md:w-[170px]" />
        </Link>

        {/* Desktop Navigation */}
        <ul className="hidden md:flex items-center gap-8 text-sm text-neutral-400 font-medium">
          {navItems.map((item, index) => {
            const Icon = item.icon;

            return (
              <li key={index}>
                <Link
                  to={item.path}
                  className="flex items-center gap-2 hover:text-white transition"
                >
                  <Icon size={18} />
                  {item.name}
                </Link>
              </li>
            );
          })}
        </ul>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setMenuOpen(true)}
          className="md:hidden text-white"
        >
          <Menu size={26} />
        </button>
      </nav>

      {/* Mobile Right Slider */}
      <div
        className={`fixed top-0 right-0 h-full w-[280px] bg-black z-50 transform transition-transform duration-300 ${
          menuOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* Close Button */}
        <div className="flex justify-end p-6">
          <button onClick={() => setMenuOpen(false)} className="text-white">
            <X size={26} />
          </button>
        </div>

        {/* Mobile Navigation */}
        <ul className="flex flex-col gap-6 px-6 text-neutral-300 text-lg">
          {navItems.map((item, index) => {
            const Icon = item.icon;

            return (
              <li key={index}>
                <Link
                  to={item.path}
                  onClick={() => setMenuOpen(false)}
                  className="flex items-center gap-3 hover:text-white transition"
                >
                  <Icon size={20} />
                  {item.name}
                </Link>
              </li>
            );
          })}
        </ul>
      </div>

      {/* Background Overlay */}
      {menuOpen && (
        <div
          onClick={() => setMenuOpen(false)}
          className="fixed inset-0 bg-black/40 z-40 md:hidden"
        />
      )}
    </>
  );
}

export default Navbar;
