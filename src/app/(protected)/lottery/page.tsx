import React from "react";
import HomeHeader from "@/components/headers/HomeHeader";
import LotteryPrizes from "@/components/Lottery/LotteryPrizes";
import LotteryGift from "@/components/Lottery/LotteryGift";
import LotteryAction from "@/components/Lottery/LotteryAction";
import LotteryTabs from "@/components/Lottery/LotteryTabs";

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
