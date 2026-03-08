import React from "react";
import Trending from "../assets/trending.png";
import { useNavigate } from "react-router";

function TrendingNow() {
  const navigate = useNavigate();
  const handleClick = () => {
    navigate("/new-collection");
  };
  return (
    <div
      onClick={handleClick}
      className="relative bg-neutral-900 w-full h-[70vh] md:h-screen"
    >
      <img
        src={Trending}
        className="w-full opacity-60 h-full object-cover"
        alt="Trending Hoodies"
      />

      <div className="absolute md:bottom-20 bottom-5 md:left-20 left-5 text-white max-w-xl">
        <h3 className="md:text-6xl text-3xl font-bold md:mb-4">TRENDING NOW</h3>

        <p className="md:text-lg text-sm text-gray-300 leading-relaxed">
          Discover the most hyped Gen-Z hoodies of the season. Oversized fits,
          bold graphics, and street-ready comfort designed for everyday flex.
          Built for creators, rebels, and trendsetters who refuse to blend in.
        </p>
      </div>
    </div>
  );
}

export default TrendingNow;
