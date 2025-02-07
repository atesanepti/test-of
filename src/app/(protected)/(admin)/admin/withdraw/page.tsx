import Filter from "@/components/withdraw/Filter";
import SearchWithdraw from "@/components/withdraw/SearchWithdraws";
import WithdrawList from "@/components/withdraw/WithdrawList";
import  HomeHeader from '@/components/headers/HomeHeader';

const WithdrawPage = () => {
  return (
    <div>
      <HomeHeader/>
      <div className="container px-3 ">
        <SearchWithdraw />
        <Filter />
        <WithdrawList />
      </div>
    </div>
  );
};

export default WithdrawPage;
