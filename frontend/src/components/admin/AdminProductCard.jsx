import React from "react";
import { Pencil, Trash2, Package } from "lucide-react";

function AdminProductCard({ product }) {
  return (
    <div className="group bg-white rounded-xl overflow-hidden border hover:shadow-xl transition duration-300">
      {/* Image */}
      <div className="relative bg-[#f6f6f6] h-[300px] overflow-hidden">
        <img
          src={product.frontImage.url}
          alt={product.name}
          className="w-full h-full object-cover transition duration-500 group-hover:scale-105"
        />

        {/* Action Icons */}
        <div className="absolute top-3 right-3 flex gap-2 opacity-0 group-hover:opacity-100 transition">
          <button className="bg-white p-2 rounded-full shadow hover:bg-blue-50">
            <Pencil size={18} className="text-blue-600" />
          </button>

          <button className="bg-white p-2 rounded-full shadow hover:bg-red-50">
            <Trash2 size={18} className="text-red-600" />
          </button>
        </div>

        {/* Stock Badge */}
        <div className="absolute bottom-3 left-3 flex items-center gap-1 bg-black text-white text-xs px-2 py-1 rounded">
          <Package size={14} />
          {product.totalStock}
        </div>
      </div>

      {/* Product Info */}
      <div className="p-4">
        <h2 className="font-semibold text-sm line-clamp-1">{product.name}</h2>

        <p className="text-xs text-gray-500 line-clamp-2 mt-1">
          {product.description}
        </p>

        <div className="flex justify-between items-center mt-3">
          <p className="font-semibold text-lg">₹{product.price}</p>

          {product.featured && (
            <span className="text-xs bg-black text-white px-2 py-1 rounded">
              Featured
            </span>
          )}
        </div>
      </div>
    </div>
  );
}

export default AdminProductCard;
