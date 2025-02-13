/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import { useEffect, useRef, useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import GameHeader from "@/components/multiplier/GameHeader";
import CountDown from "@/components/multiplier/CountDown";
import { cn, random } from "@/lib/utils";
import Loader from "@/components/GameLoader";
import { useFetchWalletDataQuery } from "@/lib/features/api/walletApiSlice";
import toast from "react-hot-toast";
import {
  useFetchMultiplierHistoryQuery,
  useUpdateForBetMutation,
  useUpdateMultiplierHistoryMutation,
} from "@/lib/features/api/betApiSlice";
import { MultiplierHistoryInput } from "@/types/interface";
import { BetResult } from "@prisma/client";
import { Games } from "@/types/enum";
// import { userRecords } from "@/lib/analycis/multiplier";

enum GAME_STATE {
  INACTIVE = "inactive",
  COUNTDOWN = "countdown",
  ACTIVE = "active",
  CRASHED = "crashed",
}

interface GameHistory {
  value: number;
  result: "PROFIT" | "LOSS";
}

interface GameInitData {
  betAmount: number;
  lastMultiplier?: number;
}

export default function CrashGame() {
  const [multiplier, setMultiplier] = useState(1.0);
  const [gameState, setGameState] = useState<GAME_STATE>(GAME_STATE.INACTIVE);
  const [betAmount, setBetAmount] = useState(100);
  const [autoCashout, setAutoCashout] = useState(0);
  const [gameData, setGameDate] = useState<GameInitData>({
    betAmount: 0,
    lastMultiplier: 0,
  });
  const [countdown, setCountdown] = useState(5);
  const [gameHistory, setGameHistory] = useState<GameHistory[]>([]);
  const [cashout, setCashout] = useState(false);
  const gameInterval = useRef<NodeJS.Timeout | null>(null);
  const countdownInterval = useRef<NodeJS.Timeout | null>(null);
  const mainSound = useRef(new Audio("/assets/audio/main.wav"));
  const cashoutSound = useRef(new Audio("/assets/audio/cashout.mp3"));
  const failSound = useRef(new Audio("/assets/audio/fail.mp3"));
  const takeOffSound = useRef(new Audio("/assets/audio/take_off.mp3"));
  const [currentAccount, setCurrentAccount] = useState(0.0);

  const [betUpdateApi] = useUpdateForBetMutation();
  const [historyUpdateApi] = useUpdateMultiplierHistoryMutation();

  const { data: wallets, isLoading } = useFetchWalletDataQuery();
  const { data: history, isLoading: historyIsLoading } =
    useFetchMultiplierHistoryQuery();
  const historyPayload = history?.payload;
  const mainWallet = wallets?.payload.mainWallet;
  useEffect(() => {
    return () => {
      if (gameInterval.current) {
        clearInterval(gameInterval.current);
      }
      if (countdownInterval.current) {
        clearInterval(countdownInterval.current);
      }
    };
  }, []);

  const startGame = () => {
    setCurrentAccount(currentAccount - betAmount);
    betUpdateApi({ amount: betAmount, operation: "DECREMENT" });

    setGameDate((state) => ({ ...state, betAmount }));

    mainSound.current.play();
    setGameState(GAME_STATE.ACTIVE);

    gameInterval.current = setInterval(() => {
      setMultiplier((state) => {
        const growth = 0.02;
        const newMultiplier = +(state + growth).toFixed(2);

        return newMultiplier;
      });
    }, 100);
  };

  const handleCashout = (multiplier: number) => {
    const winnings = Math.round(betAmount * multiplier);
    setGameDate((state) => ({ ...state, lastMultiplier: multiplier }));
    setCashout(true);
    setGameHistory((prev) => [
      { value: +multiplier.toFixed(2), result: "PROFIT" },
      ...prev.slice(0, 4),
    ]);

    cashoutSound.current.play();
    setCurrentAccount(currentAccount + winnings);

    toast.success(`You won ${winnings} BDT`);
    betUpdateApi({
      amount: winnings,
      operation: "INCREMENT",
    });
  };

  const endGame = () => {
    if (gameInterval.current) {
      clearInterval(gameInterval.current);
    }
    failSound.current.play();
    mainSound.current.pause();
    mainSound.current.currentTime = 0;

    setGameState(GAME_STATE.CRASHED);
    setGameHistory((prev) => [
      { value: +multiplier.toFixed(2), result: "LOSS" },
      ...prev.slice(0, 4),
    ]);

    toast.error("Game Ended");

    const payload: MultiplierHistoryInput = {
      base_amount: gameData.betAmount,
      multiplier: multiplier,
      result: BetResult.LOSS,
    };

    if (cashout) {
      payload.base_amount = gameData.betAmount;
      payload.profit = Math.round(
        gameData.betAmount * gameData.lastMultiplier!
      );
      payload.multiplier = gameData.lastMultiplier!;
      payload.result = BetResult.PROFILT;
    }

    historyUpdateApi(payload)
      .unwrap()
      .then(() => {
        resetGame();
      });
  };

  const startCountdown = () => {
    if (betAmount < 100) {
      return toast.error("Minimum bet amount 100 BDT");
    }
    if (mainWallet && betAmount > currentAccount) {
      return toast.error("Recharge your wallet");
    }
    setGameState(GAME_STATE.COUNTDOWN);

    countdownInterval.current = setInterval(() => {
      setCountdown((prev) => prev - 1);
    }, 1000);
  };

  const resetGame = () => {
    takeOffSound.current.play();
    setMultiplier(1.0);
    setGameState(GAME_STATE.INACTIVE);
    setCashout(false);
    setGameDate({
      betAmount: 0,
      lastMultiplier: 0,
    });
  };

  const gameEndFor = () => {
    // if (cashout) {
    //   if (Math.random() * (50 - 10) + 20 < 0.01 + multiplier / 100) {
    //     return true;
    //   }
    // } else {
    //   if (multiplier <= 1.04) {
    //     if (Math.round(Math.random() * 2) % 2 == 0) return true;
    //   } else {
    //     if (!historyPayload) {
    //       if (Math.random() < 0.01 + multiplier / 100) {
    //         return true;
    //       }
    //     } else if (historyPayload && historyPayload!.history!.length > 0) {
    //       const { winingRate, losingRate } = userRecords(
    //         historyPayload!.history
    //       );
    //       if (winingRate !== 0 && winingRate > 30) {
    //         const startTime = Date.now();
    //         if (startTime % 2 == 0) return true;
    //       } else if (winingRate !== 0 && winingRate < 30) {
    //         if (Math.random() < multiplier / 100) {
    //           return true;
    //         }
    //       }

    //       if (losingRate !== 0 && losingRate > 10) {
    //         if (Math.random() * 2 < multiplier / 100) {
    //           return true;
    //         }
    //       } else {
    //         if (Math.random() * 0.5 < multiplier / 100) {
    //           return true;
    //         }
    //       }
    //     }
    //   }
    // }

    //TODO : tast
    const start = random(15, 50);
    if (start < multiplier) {
      return true;
    }
    return false;
  };

  useEffect(() => {
    if (countdown == 0) {
      if (countdownInterval.current) {
        clearInterval(countdownInterval.current);
        startGame();
      }
      setCountdown(5);
    }
  }, [countdown]);

  useEffect(() => {
    if (mainWallet?.account) {
      setCurrentAccount(mainWallet.account);
    }
  }, [mainWallet]);

  useEffect(() => {
    mainSound.current.onended = () => {
      mainSound.current.currentTime = 0;
      mainSound.current.play(); // Auto-restart
    };
  }, [mainSound]);

  useEffect(() => {
    if (multiplier > 1) {
      if (gameEndFor()) {
        endGame();
      }
    }

    if (autoCashout) {
      if (
        Math.round(gameData.betAmount * multiplier) === autoCashout &&
        !cashout
      ) {
        handleCashout(multiplier);
      }
    }
  }, [multiplier]);

  useEffect(() => {
    console.log({ historyPayload });
  }, [historyPayload]);

  return (
    <div className="py-4 px-2 ">
      <div className="container shadow-2xl">
        <GameHeader game={Games.MULTIPLIER} account={currentAccount} />
        <div className="crash-bg mb-4 p-3  shadow-lg min-h-[230px] relative border-2 border-border ">
          <h4
            className={cn(
              "text-5xl font-bold font-oswald absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-white",
              `${gameState === GAME_STATE.CRASHED && "text-destructive"}`
            )}
          >
            {multiplier.toFixed(2)}x
          </h4>

          {gameState === GAME_STATE.COUNTDOWN && (
            <CountDown countDown={countdown} />
          )}
        </div>
        <div className="p-3  rounded-lg mb-4 border border-border">
          <div className="game-controls grid grid-cols-2  gap-4">
            <div className="bet-section">
              <label
                htmlFor="betAmount"
                className="block mb-2 text-sm text-white"
              >
                Bet Amount
              </label>
              <Input
                disabled={gameState == GAME_STATE.ACTIVE}
                type="number"
                id="betAmount"
                placeholder="Enter bet amount"
                value={`${betAmount}`}
                onChange={(e) =>
                  setBetAmount(
                    e.target.value ? parseFloat(e.target.value) : 100
                  )
                }
              />
              <div className="flex gap-2 items-center mt-2">
                <button
                  onClick={() => setBetAmount(100)}
                  disabled={gameState === GAME_STATE.ACTIVE}
                  className="bg-primary disabled:opacity-50 hover:bg-primary/90 px-2 py-1 rounded-md border border-border cursor-pointer text-white text-xs"
                >
                  100
                </button>
                <button
                  onClick={() => setBetAmount(150)}
                  disabled={gameState === GAME_STATE.ACTIVE}
                  className="bg-primary disabled:opacity-50 hover:bg-primary/90 px-2 py-1 rounded-md border border-border cursor-pointer text-white text-xs"
                >
                  150
                </button>
                <button
                  onClick={() => setBetAmount(200)}
                  disabled={gameState === GAME_STATE.ACTIVE}
                  className="bg-primary disabled:opacity-50 hover:bg-primary/90 px-2 py-1 rounded-md border border-border cursor-pointer text-white text-xs"
                >
                  200
                </button>
                <button
                  onClick={() => setBetAmount(500)}
                  disabled={gameState === GAME_STATE.ACTIVE}
                  className="bg-primary disabled:opacity-50 hover:bg-primary/90 px-2 py-1 rounded-md border border-border cursor-pointer text-white text-xs"
                >
                  500
                </button>
              </div>
            </div>

            <div className="auto-cashout-section">
              <label
                htmlFor="autoCashout"
                className="block mb-2 text-sm text-white"
              >
                Auto Cashout
              </label>
              <Input
                disabled={gameState == GAME_STATE.ACTIVE}
                type="number"
                id="autoCashout"
                placeholder="Auto cashout at"
                min={betAmount}
                value={`${autoCashout}`}
                onChange={(e) =>
                  setAutoCashout(
                    e.target.value ? parseFloat(e.target.value) : betAmount
                  )
                }
              />
            </div>
          </div>

          <div className="game-buttons mt-4  grid grid-cols-2 gap-4">
            <Button
              size={"sm"}
              onClick={startCountdown}
              disabled={gameState !== GAME_STATE.INACTIVE}
            >
              Bet{" "}
              {gameState === GAME_STATE.ACTIVE &&
                !cashout &&
                `${(betAmount * multiplier).toFixed(2)} BDT`}
            </Button>
            <Button
              size={"sm"}
              variant={"secondary"}
              onClick={() => handleCashout(multiplier)}
              disabled={gameState !== GAME_STATE.ACTIVE || cashout}
            >
              Cashout{" "}
            </Button>
          </div>
        </div>
        <div className="p-3 rounded-lg mb-4 border border-border">
          <h3 className="text-sm font-semibold mb-3 text-white">
            Game History
          </h3>
          <div className="grid grid-cols-5 gap-2 text-center">
            {gameHistory.map((entry, index) => (
              <div
                key={index}
                className={cn(
                  "px-2 py-1 rounded-md text-white ",
                  `${
                    entry.result == "PROFIT"
                      ? "bg-emerald-600"
                      : "bg-destructive"
                  }`
                )}
              >
                {entry.value}X
              </div>
            ))}
          </div>
        </div>
      </div>

      {isLoading && historyIsLoading && <Loader />}
    </div>
  );
}
