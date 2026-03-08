import React from "react";
import flxoraVideo from "../assets/flxora_video1.mp4";
import { Link } from "react-router-dom";

function LandingBanner() {
  return (
    <div className="w-full relative h-screen bg-neutral-300 overflow-hidden">
      {/* Overlay */}
      <div className="absolute inset-0 z-5 bg-linear-to-b from-neutral-900/60 to-black">
        <Link
          to="/new-collection"
          className="absolute text-5xl bottom-20 right-20 text-white"
        >
          SHOP NOW
        </Link>
      </div>

      {/* Background video */}
      <video
        className="w-full h-full object-cover pointer-events-none"
        loop
        autoPlay
        muted
        src={flxoraVideo}
      />
    </div>
  );
}

export default LandingBanner;
