import React, { useRef } from "react";
import Tshirt from "../assets/tshirt1.png";
import Tshirt2 from "../assets/tshirt1_1.png";
import { ChevronLeft, ChevronRight } from "lucide-react";
import ProductShow from "./ProductShow";

function WomenHome() {
  const sliderRef = useRef(null);

  const scroll = (direction) => {
    if (sliderRef.current) {
      const scrollAmount = 320;
      sliderRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
    }
  };

  const WomenHomeData = [
    {
      _id: "1",
      name: "Speed Raglan Lounge Tee Vintage White/Black",
      price: "₹3,999",
      images: [{ url: Tshirt }, { url: Tshirt2 }],
    },
    {
      _id: "2",
      name: "Oversized Street Tee",
      price: "₹2,999",
      images: [{ url: Tshirt }, { url: Tshirt2 }],
    },
    {
      _id: "3",
      name: "Boxy SS Overshirt Blue Stripe",
      price: "₹4,499",
      images: [{ url: Tshirt }, { url: Tshirt2 }],
    },
    {
      _id: "4",
      name: "Legacy Work Pant Sand",
      price: "₹5,999",
      images: [{ url: Tshirt }, { url: Tshirt2 }],
    },
  ];

  return (
    <div className="w-full px-6 md:px-12 py-16 relative">
      <h2 className="text-4xl md:text-5xl font-semibold mb-10">WOMENS</h2>

      {/* Desktop Grid */}
      <div className="hidden md:grid grid-cols-4 gap-8">
        {WomenHomeData.map((item) => (
          <ProductShow key={item._id} item={item} />
        ))}
      </div>

      {/* Mobile / Tablet Slider */}
      <div className="relative md:hidden">
        {/* Left Arrow */}
        <button
          onClick={() => scroll("left")}
          className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white shadow p-2"
        >
          <ChevronLeft />
        </button>

        {/* Slider */}
        <div
          ref={sliderRef}
          className="flex gap-6 overflow-x-auto scroll-smooth scrollbar-hide"
        >
          {WomenHomeData.map((item) => (
            <ProductShow key={item._id} item={item} />
          ))}
        </div>

        {/* Right Arrow */}
        <button
          onClick={() => scroll("right")}
          className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white shadow p-2"
        >
          <ChevronRight />
        </button>
      </div>
    </div>
  );
}

export default WomenHome;
