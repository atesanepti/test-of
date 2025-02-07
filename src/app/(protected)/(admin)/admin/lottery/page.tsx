import React from "react";
import HomeHeader from "@/components/headers/HomeHeader";
import TicketListAdmin from "@/components/Lottery/TicketListAdmin";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Lottery | CasinoCity24",
  description: "Lottery participation list",
};
const LotteryPage = async () => {
  return (
    <div className="px-2">
      <HomeHeader />
      <div className="container py-6">
        <TicketListAdmin />
      </div>
    </div>
  );
};

export default LotteryPage;
