"use client";
import React, { useEffect, useRef, useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "../ui/button";
import { SlotGameState, useSlot } from "@/lib/store";
import { useUpdateForBetMutation } from "@/lib/features/api/betApiSlice";

const Bet = () => {
  const mainSound = useRef(new Audio("/assets/audio/slot.mp3"));

  const [betAmount, setAmount] = useState(20);

  const [betUpdateApi] = useUpdateForBetMutation();

  const {
    gameState,
    setBetAmount,
    setGamState,
    setProfitAmount,
    setWallet,
    wallet,
  } = useSlot((state) => state);

  const handleBet = () => {
    mainSound.current.play();
    mainSound.current.volume = 0.5;
    setBetAmount(betAmount);
    setProfitAmount(betAmount);
    setWallet(wallet - betAmount);
    setGamState(SlotGameState.ACTIVE);

    betUpdateApi({ amount: betAmount, operation: "DECREMENT" });
  };

  useEffect(() => {
    mainSound.current.onended = () => {
      mainSound.current.currentTime = 0;
      mainSound.current.play();
      mainSound.current.volume = 0.5;
    };
  }, [mainSound]);

  useEffect(() => {
    if (gameState == SlotGameState.WIN || gameState == SlotGameState.LOST) {
      mainSound.current.focus();
      mainSound.current.currentTime = 0;
    }
  }, [gameState]);
  return (
    <div className="flex-1 bg-primary border border-border rounded-lg relative p-3 mt-2">
      <h4 className="text-white text-sm mb-1">Bet</h4>
      <div>
        <label className="text-xs text-muted-foreground mb-1">Bet Amount</label>
        <Input
          disabled={gameState !== SlotGameState.INACTIVE}
          placeholder="Enter bet amount"
          className="bg-[#272F48] border-none"
          value={betAmount}
          onChange={(e) => setAmount(parseInt(e.target.value))}
        />
        <div className="flex items-center gap-2">
          <button
            disabled={gameState !== SlotGameState.INACTIVE}
            onClick={() => setBetAmount(20)}
            className="cursor-pointer text-white text-xs bg-primary hover:bg-primary/90 border border-border rounded-sm px-2 py-1"
          >
            20
          </button>
          <button
            disabled={gameState !== SlotGameState.INACTIVE}
            onClick={() => setAmount(50)}
            className="cursor-pointer text-white text-xs bg-primary hover:bg-primary/90 border border-border rounded-sm px-2 py-1"
          >
            50
          </button>
          <button
            disabled={gameState !== SlotGameState.INACTIVE}
            onClick={() => setBetAmount(100)}
            className="cursor-pointer text-white text-xs bg-primary hover:bg-primary/90 border border-border rounded-sm px-2 py-1"
          >
            100
          </button>
          <button
            disabled={gameState !== SlotGameState.INACTIVE}
            onClick={() => setBetAmount(500)}
            className="cursor-pointer text-white text-xs bg-primary hover:bg-primary/90 border border-border rounded-sm px-2 py-1"
          >
            100
          </button>
        </div>
      </div>

      <Button
        onClick={handleBet}
        disabled={gameState !== SlotGameState.INACTIVE}
        size={"sm"}
        className="mt-2"
      >
        Place Bet
      </Button>
    </div>
  );
};

export default Bet;
