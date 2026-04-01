import { Plus, ShoppingBag } from "lucide-react";
import React from "react";
import { Link } from "react-router-dom";
import Tshirt from "../assets/tshirt1.png";
import Tshirt2 from "../assets/tshirt1_1.png";

function ProductCard({ product }) {
  const { _id, name, frontImage, price, discountPrice, images } = product;
  
  // Extract images correctly whether they are strings or objects with .url
  const getImageUrl = (img) => {
    if (!img) return null;
    return typeof img === "string" ? img : img.url;
  };

  const primaryImage = Tshirt;
  const secondaryImage = Tshirt2;

  return (
    <Link
      to={`/product/${_id}`}
      className="group flex flex-col bg-white overflow-hidden"
    >
      <div className="relative aspect-[4/5] w-full overflow-hidden bg-[#f6f6f6]">
        {/* Top Right Actions (Plus Icon) */}
        <div className="absolute top-4 right-4 z-10 flex flex-col gap-2">
          <div className="bg-white/80 backdrop-blur-md p-2 opacity-0 translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300 shadow-sm border border-neutral-100">
            <Plus size={18} className="text-black" />
          </div>
        </div>

        {/* Sale/Badge */}
        {discountPrice && (
          <div className="absolute top-3 left-3 bg-black text-white text-[10px] px-2 py-1 font-bold uppercase tracking-widest z-10">
            Sale
          </div>
        )}

        {/* Front Image */}
        <img
          src={primaryImage}
          alt={name}
          className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-700 ease-in-out ${secondaryImage ? "group-hover:opacity-0" : "group-hover:scale-105"}`}
        />

        {/* Back Image (Hover) */}
        {secondaryImage && (
          <img
            src={secondaryImage}
            alt={name}
            className="absolute inset-0 w-full h-full object-cover opacity-0 group-hover:opacity-100 transition-opacity duration-700 ease-in-out"
          />
        )}
      </div>

      {/* Name and Price Section (Centered) */}
      <div className="mt-4 text-center pb-2">
        <h3 className="text-sm font-medium text-gray-900 group-hover:text-neutral-500 transition-colors uppercase tracking-tight line-clamp-1">{name}</h3>
        <div className="flex items-center justify-center gap-2 mt-1">
          <span className="text-sm font-semibold">₹{discountPrice || price}</span>
          {discountPrice && (
            <span className="text-xs text-gray-400 line-through">₹{price}</span>
          )}
        </div>
      </div>
    </Link>
  );
}

export default ProductCard;
