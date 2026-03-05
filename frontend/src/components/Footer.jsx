import React from "react";
import { Link } from "react-router-dom";
import Logo from "../assets/flxora.png";
import { Instagram, Twitter, Facebook } from "lucide-react";

function Footer() {
  return (
    <footer className="bg-black text-white px-6 md:px-20 py-16">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
        {/* Brand */}
        <div className="flex flex-col">
          <img src={Logo} className="-mt-15" alt="flxora_logo" width={160} />
          <p className="text-neutral-400 -mt-10 mb-5 text-sm">
            FLXORA is a modern fashion brand bringing premium streetwear
            aesthetics with futuristic design and bold style.
          </p>

          <div className="flex gap-4 pt-2">
            <Instagram className="cursor-pointer hover:text-neutral-300" />
            <Twitter className="cursor-pointer hover:text-neutral-300" />
            <Facebook className="cursor-pointer hover:text-neutral-300" />
          </div>
        </div>

        {/* Shop */}
        <div>
          <h3 className="font-semibold mb-4 text-lg">Shop</h3>
          <ul className="flex flex-col gap-2 text-neutral-400">
            <Link to="/women">Women</Link>
            <Link to="/men">Men</Link>
            <Link to="/new-collection">New Collection</Link>
          </ul>
        </div>

        {/* Company */}
        <div>
          <h3 className="font-semibold mb-4 text-lg">Company</h3>
          <ul className="flex flex-col gap-2 text-neutral-400">
            <Link to="/about">About Us</Link>
            <Link to="/contact">Contact</Link>
            <Link to="/careers">Careers</Link>
          </ul>
        </div>

        {/* Support */}
        <div>
          <h3 className="font-semibold mb-4 text-lg">Support</h3>
          <ul className="flex flex-col gap-2 text-neutral-400">
            <Link to="/faq">FAQ</Link>
            <Link to="/shipping">Shipping</Link>
            <Link to="/returns">Returns</Link>
            <Link to="/privacy">Privacy Policy</Link>
          </ul>
        </div>
      </div>

      {/* Divider */}
      <div className="border-t border-neutral-800 mt-12 pt-6 text-center text-neutral-500 text-sm">
        © {new Date().getFullYear()} FLXORA. All rights reserved.
      </div>
    </footer>
  );
}

export default Footer;
