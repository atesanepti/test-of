"use client";
import React, { useEffect } from "react";
import GameHeader from "@/components/multiplier/GameHeader";
import { useFetchWalletDataQuery } from "@/lib/features/api/walletApiSlice";
import { Games } from "@/types/enum";
import Loader from "@/components/GameLoader";
import Slot from "@/components/slot/Slot";
import Bet from "@/components/slot/Bet";
import BetState from "@/components/slot/BetState";
import { SlotGameState, useSlot } from "@/lib/store";
import Celebration from "@/components/Celebration";

const SlotPage = () => {
  const { data, isLoading } = useFetchWalletDataQuery();
  const { setWallet, wallet, gameState } = useSlot((state) => state);
  const mainAccount = data?.payload?.mainWallet;

  useEffect(() => {
    if (mainAccount) {
      setWallet(mainAccount.account);
    }
  }, [mainAccount, setWallet]);

  return (
    <div className="py-4 px-2 slot-bg overflow-x-hidden">
      <div className="container">
        <GameHeader account={wallet} game={Games.SLOT} />
        <Slot />
        <div className="flex gap-1 lg:gap-3">
          <Bet />
          <BetState />
        </div>
        {isLoading && <Loader />}

        <Celebration isWinning={gameState == SlotGameState.WIN} />
      </div>
    </div>
  );
};

export default SlotPage;
