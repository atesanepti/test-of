import React from "react";
import HomeHeader from "@/components/headers/HomeHeader";
import LotteryPrizes from "@/components/Lottery/LotteryPrizes";
import LotteryGift from "@/components/Lottery/LotteryGift";
import LotteryAction from "@/components/Lottery/LotteryAction";
import LotteryTabs from "@/components/Lottery/LotteryTabs";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Lottery | CasinoCity24",
  description:
    "Try your luck with our exciting lottery games! Win big prizes and real money on Bangladesh’s top online casino and betting site",
};

const LotteryPage = () => {
  return (
    <div>
      <HomeHeader />
      <div className="container py-6">
        <LotteryPrizes />
        <LotteryGift />
        <LotteryAction />
        <LotteryTabs />
      </div>
    </div>
  );
};

export default LotteryPage;
