import React from "react";
import LandingBanner from "../components/LandingBanner";
import NewIn from "../components/NewIn";
import MenHome from "../components/MenHome";
import WomenHome from "../components/WomenHome";
import TrendingNow from "../components/TrendingNow";

function Home() {
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

export default Home;
