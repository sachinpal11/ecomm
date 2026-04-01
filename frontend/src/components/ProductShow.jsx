import React from "react";
import { useNavigate } from "react-router";

function ProductShow({ item }) {
  const navigate = useNavigate();
  const handleClick = () => {
    navigate(`/product/${item._id}`);
  };
  return (
    <div
      onClick={handleClick}
      className="group cursor-pointer min-w-[280px] md:min-w-0"
    >
      <div className="relative bg-[#f6f6f6] overflow-hidden aspect-[4/5] w-full">
        <span className="absolute top-3 left-3 text-xs font-medium z-10">
          NEW
        </span>

        <img
          src={item.images[0].url}
          alt={item.name}
          className="absolute inset-0 w-full h-full object-cover transition-opacity duration-500 group-hover:opacity-0"
        />

        <img
          src={item.images[1].url}
          alt={item.name}
          className="absolute inset-0 w-full h-full object-cover opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        />
      </div>

      <div className="mt-4 text-center">
        <h3 className="text-sm font-medium">{item.name}</h3>
        <p className="text-sm mt-1">{item.price}</p>
      </div>
    </div>
  );
}

export default ProductShow;
