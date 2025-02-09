import TabLayout from "@/components/TabLayout";
import React from "react";
import { Metadata } from "next";
import HomeHeader from "@/components/headers/HomeHeader";

export const metadata: Metadata = {
  title: "Games | CasinoCity24",
  description:
    "Explore exciting casino games including Slots, Wheel, Toss, Crash, and Dice. Play now and win real money at Bangladesh’s top betting site!",
};
const GameLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <TabLayout>
      <HomeHeader />
      {children}
    </TabLayout>
  );
};

export default GameLayout;
