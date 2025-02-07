import Filter from "@/components/withdraw/Filter";
import SearchWithdraw from "@/components/withdraw/SearchWithdraws";
import WithdrawList from "@/components/withdraw/WithdrawList";
import HomeHeader from "@/components/headers/HomeHeader";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Withdraw | CasinoCity24",
  description: "Withdraws list",
};

const WithdrawPage = () => {
  return (
    <div>
      <HomeHeader />
      <div className="container px-3 ">
        <SearchWithdraw />
        <Filter />
        <WithdrawList />
      </div>
    </div>
  );
};

export default WithdrawPage;
