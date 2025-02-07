/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { cn, random } from "@/lib/utils";
import { useToss } from "@/lib/store";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { useUpdateForBetMutation } from "@/lib/features/api/betApiSlice";
import { Coin } from "@/types/enum";
import toast from "react-hot-toast";

export default function CoinToss() {
  const [flipping, setFlipping] = useState(false);
  const [coin, setCoin] = useState<Coin | null>(null);
  const [displayResult, setDisplayResult] = useState<Coin | null>(Coin.HEADS);

  const [amount, setAmount] = useState(20);

  const {
    setWallet,
    wallet,
    setBetAmount,
    betAmount,
    selectedCoin,
    setSelectedCoin,
  } = useToss();

  const handleFlip = () => {
    setFlipping(true);
    setDisplayResult(null);
    setTimeout(() => {
      setDisplayResult(random(1, 2) % 2 == 0 ? Coin.HEADS : Coin.TAILS);
      setFlipping(false);
    }, 1000);
  };

  const [makeBetApi] = useUpdateForBetMutation();

  const handleToggleCoin = (coin: Coin) => {
    setCoin(coin);
  };

  const handleBet = async () => {
    if (amount < 20) {
      return toast.error("Minimum bet 20 BDT");
    }
    if (amount > wallet) {
      return toast.error("Recharge your wallet");
    }
    setBetAmount(amount);
    setWallet(wallet - amount);
    makeBetApi({ amount: amount, operation: "DECREMENT" });
  };

  useEffect(() => {
    if (displayResult) {
      if (selectedCoin) {
        if (displayResult === selectedCoin) {
          makeBetApi({ amount: betAmount * 2, operation: "INCREMENT" });
          setWallet(wallet + betAmount * 2);
          toast(`Congratulation You won ${betAmount * 2}`, {
            icon: "👏",
          });
        } else {
          toast(`Bad Lucky`, {
            icon: "😞",
          });
        }

        setBetAmount(0);
        setCoin(null);
      }
    }
  }, [displayResult]);

  useEffect(() => {
    if (coin) {
      setSelectedCoin(coin);
    }
  }, [coin]);

  return (
    <div className="flex flex-col items-center">
      <div className="mb-4">
        <h4 className="text-white text-sm mb-2">*Select</h4>
        <div className="flex items-center gap-3 ">
          <div
            onClick={() => handleToggleCoin(Coin.HEADS)}
            className={cn(
              "w-7 h-7 bg-gradient-to-b from-yellow-400 to-yellow-500 rounded-full flex items-center justify-center text-black drop-shadow-sm text-xs font-bold border-4 border-yellow-400 shadow-xl cursor-pointer",
              `${coin == "heads" ? "ring-2 ring-brand" : "ring-0"}`
            )}
          >
            H
          </div>
          <div
            onClick={() => handleToggleCoin(Coin.TAILS)}
            className={cn(
              "w-7 h-7 bg-gradient-to-b from-yellow-400 to-yellow-500 rounded-full flex items-center justify-center text-black drop-shadow-sm text-xs font-bold border-4 border-yellow-400 shadow-xl cursor-pointer",
              `${coin == "tails" ? "ring-2 ring-brand" : "ring-0"}`
            )}
          >
            T
          </div>
        </div>
      </div>
      <div className="w-24 h-24 relative">
        <motion.div
          className="w-24 h-24 bg-gradient-to-b from-yellow-400 to-yellow-500 rounded-full flex items-center justify-center text-black text-xl font-bold border-4 border-yellow-400 shadow-xl"
          animate={flipping ? { rotateY: 720 } : { rotateY: 0 }}
          transition={{ duration: 1, ease: "easeInOut" }}
        >
          {flipping
            ? Math.random() > 0.5
              ? "HEADS"
              : "TAILS"
            : displayResult?.toUpperCase()}
        </motion.div>
      </div>
      <Button
        size={"sm"}
        className="mt-6  bg-blue-600 rounded-lg hover:bg-blue-500 "
        onClick={handleFlip}
        disabled={flipping || !!!betAmount || coin == null}
      >
        Flip Coin
      </Button>

      <div className="p-3 bg-primary border border-border rounded-md mt-5 w-72 mx-auto">
        <div>
          <Input
            placeholder="Enter Bet Amount"
            onChange={(e) => setAmount(parseInt(e.target.value))}
            value={amount}
          />

          <div className="flex items-center gap-2 ">
            <button
              className="bg-primary p-2 rounded-sm cursor-pointer border border-border text-white text-xs"
              onClick={() => setAmount(20)}
            >
              20
            </button>

            <button
              className="bg-primary p-2 rounded-sm cursor-pointer border border-border text-white text-xs"
              onClick={() => setAmount(50)}
            >
              50
            </button>

            <button
              className="bg-primary p-2 rounded-sm cursor-pointer border border-border text-white text-xs"
              onClick={() => setAmount(100)}
            >
              100
            </button>

            <button
              className="bg-primary p-2 rounded-sm cursor-pointer border border-border text-white text-xs"
              onClick={() => setAmount(500)}
            >
              500
            </button>
          </div>
        </div>

        <Button
          disabled={flipping || !!betAmount}
          onClick={handleBet}
          size={"sm"}
          className="mt-2"
        >
          Place Bet
        </Button>
      </div>
    </div>
  );
}
