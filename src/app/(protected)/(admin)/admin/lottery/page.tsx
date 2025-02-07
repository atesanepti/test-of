import React from "react";
import HomeHeader from "@/components/headers/HomeHeader";
import TicketListAdmin from "@/components/Lottery/TicketListAdmin";

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
