import DepositsList from "@/components/deposit/DepositsList";
import Filter from "@/components/deposit/Filter";
import SearchDeposits from "@/components/deposit/SearchDeposits";
import  HomeHeader  from '@/components/headers/HomeHeader';

const DepositPage = () => {
  return (
    <div>
      <HomeHeader/>
      <div className="container px-3 ">
        <SearchDeposits />
        <Filter />
        <DepositsList />
      </div>
    </div>
  );
};

export default DepositPage;
