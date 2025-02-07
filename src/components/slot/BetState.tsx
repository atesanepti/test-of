/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import React, { useEffect, useRef } from "react";
import { Button } from "../ui/button";
import { SlotGameState, useSlot } from "@/lib/store";
import { format } from "@/lib/currency";
import { useUpdateForBetMutation } from "@/lib/features/api/betApiSlice";
import WinSlot from "./icons/WinSlot";
import LossSlot from "./icons/LossSlot";
import toast from "react-hot-toast";

const GameStatus = ({ gameStatus }: { gameStatus: SlotGameState }) => {
  if (gameStatus == SlotGameState.INACTIVE) {
    return (
      <div
        className={`flex items-center gap-2 px-2 py-1 rounded-lg bg-[#EFB036]/15`}
      >
        <span className={`text-[10px] text-[#EFB036]`}>InActive</span>
      </div>
    );
  } else if (gameStatus == SlotGameState.ACTIVE) {
    return (
      <div
        className={`flex items-center gap-2 px-2 py-1 rounded-lg bg-[#493D9E]/15`}
      >
        <span className={`text-[10px] text-[#493D9E]`}>Active</span>
      </div>
    );
  } else if (gameStatus == SlotGameState.LOST) {
    return (
      <div
        className={`flex items-center gap-2 px-2 py-1 rounded-lg bg-[#ff4a59]/15`}
      >
        <span className={`text-[10px] text-[#ff4a59]`}>End with Loss</span>
      </div>
    );
  } else if (gameStatus == SlotGameState.WIN) {
    return (
      <div
        className={`flex items-center gap-2 px-2 py-1 rounded-lg bg-[#059669]/15`}
      >
        <span className={`text-[10px] text-[#059669]`}>End with win</span>
      </div>
    );
  }
};

const BetState = () => {
  const cashOut = useRef(new Audio("/assets/audio/cashout.mp3"));
  const {
    profitAmount,
    gameState,
    betAmount,
    setWallet,
    resetGame,
    wallet,
    prevSlotState,
    setGamState,
  } = useSlot((state) => state);

  const [betUpdateApi] = useUpdateForBetMutation();

  const handleTakeOff = () => {
    toast(`You won : ${format(profitAmount)}`, {
      icon: "👏",
    });
    cashOut.current.play();

    setWallet(wallet + profitAmount);
    setGamState(SlotGameState.INACTIVE);
    resetGame();

    betUpdateApi({ amount: profitAmount, operation: "INCREMENT" });
  };

  const takeOffButtonDisable = () => {
    if (gameState == SlotGameState.ACTIVE) {
      if (profitAmount > betAmount) {
        return false;
      }
    }

    return true;
  };

  useEffect(() => {
    if (gameState == SlotGameState.WIN) {
      setWallet(wallet + profitAmount);
      betUpdateApi({ amount: profitAmount, operation: "INCREMENT" });
    }
  }, [gameState]);

  return (
    <div className="flex-1 bg-primary border border-border rounded-lg relative p-3 mt-2">
      <div className="flex items-center justify-between">
        <h4 className="text-white text-sm mb-2">Bet Statistics</h4>
        <GameStatus gameStatus={gameState} />
      </div>
      <div className="flex items-center my-2 gap-2">
        {prevSlotState.map((s, i) =>
          s.selectedSlot == s.winnerSlot ? (
            <WinSlot className="w-4 h-4 md:w-4 md:h-4" key={i} />
          ) : (
            <LossSlot className="w-4 h-4 md:w-4 md:h-4" key={i} />
          )
        )}

        {Array.from({ length: 4 - prevSlotState.length })
          .fill(0)
          .map((_, i) => (
            <div
              key={i}
              className="w-3 h-3 bg-muted-foreground rounded-sm rotate-45"
            ></div>
          ))}
      </div>
      <div className="mt-3">
        <Button
          onClick={handleTakeOff}
          size={"sm"}
          className="bg-emerald-600  hover:bg-emerald-600/90 "
          disabled={takeOffButtonDisable()}
        >
          Take Off{" "}
          {profitAmount !== betAmount && <span>{format(profitAmount)}</span>}
        </Button>
      </div>
    </div>
  );
};

export default BetState;
