import React from "react";
import flxoraVideo from "../assets/flxora_video1.mp4";
function LandingBanner() {
  return (
    <div className="w-full relative h-screen bg-neutral-300 overflow-hidden">
      <div className="absolute w-full h-full bg-neutral-900/70"></div>
      <video
        className="w-full object-cover h-full"
        loop
        autoPlay
        muted
        src={flxoraVideo}
      ></video>
    </div>
  );
}

export default LandingBanner;
