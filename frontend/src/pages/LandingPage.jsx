import React from "react";
import LandingBanner from "../components/LandingBanner";
import NewIn from "../components/NewIn";
import TrendingNow from "../components/TrendingNow";
import MenHome from "../components/MenHome";
import WomenHome from "../components/WomenHome";

function LandingPage() {
  return (
    <>
      <LandingBanner />
      <NewIn />
      <TrendingNow />
      <MenHome />
      <WomenHome />
    </>
  );
}

export default LandingPage;
