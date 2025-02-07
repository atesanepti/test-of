import React from "react";
import HomeHeader from "@/components/headers/HomeHeader";
import CasinoGames from "@/components/games/CasinoGames";

const GamePage = () => {
  return (
    <div>
      <HomeHeader />
      <div className="container py-6">
        <CasinoGames />
      </div>
    </div>
  );
};

export default GamePage;
