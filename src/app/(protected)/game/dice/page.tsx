"use client";
import Dice from "@/components/dice/Dice";
import Loader from "@/components/GameLoader";
import GameHeader from "@/components/multiplier/GameHeader";
import { useFetchWalletDataQuery } from "@/lib/features/api/walletApiSlice";
import { useDice } from "@/lib/store";
import { Games } from "@/types/enum";
import React, { useEffect } from "react";

const DicePage = () => {
  const { data, isLoading } = useFetchWalletDataQuery();
  const { setWallet, wallet } = useDice((state) => state);
  const mainAccount = data?.payload?.mainWallet;

  useEffect(() => {
    if (mainAccount) {
      setWallet(mainAccount.account);
    }
  }, [mainAccount, setWallet]);
  return (
    <div className="py-4 px-2 slot-bg overflow-x-hidden">
      <div className="container">
        <GameHeader account={wallet} game={Games.DICE} />
        <div>
          <Dice />
        </div>
      </div>

      {isLoading && <Loader />}
    </div>
  );
};

export default DicePage;
