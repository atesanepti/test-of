"use client";
import { useEffect } from "react";
import GameHeader from "@/components/multiplier/GameHeader";
import { useFetchWalletDataQuery } from "@/lib/features/api/walletApiSlice";
import { useToss } from "@/lib/store";
import { Games } from "@/types/enum";
import Loader from "@/components/GameLoader";
import Toss from "@/components/toss/Toss";

const TossPage = () => {
  const { data, isLoading } = useFetchWalletDataQuery();
  const { setWallet, wallet } = useToss((state) => state);
  const mainAccount = data?.payload?.mainWallet;

  useEffect(() => {
    if (mainAccount) {
      setWallet(mainAccount.account);
    }
  }, [mainAccount, setWallet]);
  return (
    <div className="py-4 px-2 slot-bg overflow-x-hidden">
      <div className="container">
        <GameHeader account={wallet} game={Games.TOSS} />
        <div>
          <Toss />
        </div>
      </div>

      {isLoading && <Loader />}
    </div>
  );
};

export default TossPage;
