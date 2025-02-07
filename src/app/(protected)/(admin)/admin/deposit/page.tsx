import DepositsList from "@/components/deposit/DepositsList";
import Filter from "@/components/deposit/Filter";
import SearchDeposits from "@/components/deposit/SearchDeposits";
import HomeHeader from "@/components/headers/HomeHeader";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Deposits | CasinoCity24",
  description: "All Deposits Requests",
};

const DepositPage = () => {
  return (
    <div>
      <HomeHeader />
      <div className="container px-3 ">
        <SearchDeposits />
        <Filter />
        <DepositsList />
      </div>
    </div>
  );
};

export default DepositPage;
