import React from "react";
import HomeHeader from "@/components/headers/HomeHeader";
import CasinoGames from "@/components/games/CasinoGames";
import { Metadata } from "next";
export const metadata: Metadata = {
  title: "Games | CasinoCity24",
  description:
    "Explore exciting casino games including Slots, Wheel, Toss, Crash, and Dice. Play now and win real money at Bangladesh’s top betting site!",
};
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
