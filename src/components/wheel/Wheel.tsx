"use client";
import { useWheel } from "@/lib/store";
import React, { useEffect, useRef, useState } from "react";
import { Roulette, useRoulette } from "react-hook-roulette";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import toast from "react-hot-toast";
import { useUpdateForBetMutation } from "@/lib/features/api/betApiSlice";

interface PrizeProps {
  name: string;
  bg: string;
  color: string;
}

const LuckyWheel = ({ items }: { items: PrizeProps[] }) => {
  const spinSound = useRef(new Audio("/assets/audio/spin.mp3"));

  const [isWheelSping, setSetWheelSping] = useState(false);
  const [amount, setAmount] = useState<number>(100);
  const [isSpinActive, setSpinActive] = useState(false);
  const { wallet, setWallet, setBetAmount, betAmount } = useWheel(
    (state) => state
  );

  const { roulette, onStart, onStop, result } = useRoulette({
    items,
    options: {
      initialAngle: 0,
      size: 280,
      style: {
        canvas: {
          bg: "transparent",
        },
        arrow: {
          bg: "white",
        },
      },
    },
  });

  const [betUpdateApi] = useUpdateForBetMutation();

  const handleSpin = () => {
    setSetWheelSping(true);
    onStart();

    spinSound.current.play();
  };

  useEffect(() => {
    if (isWheelSping) {
      setTimeout(() => {
        onStop();
        setSetWheelSping(false);
      }, 3000);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isWheelSping]);

  const handlePlaceBet = () => {
    if (amount! < 100) {
      return toast.error("Minimum bet amount 100 BDT");
    }
    if (wallet < amount!) {
      return toast.error("Recharge your wallet");
    }

    setBetAmount(amount);
    setWallet(wallet - amount);
    setSpinActive(true);

    betUpdateApi({ amount: amount!, operation: "DECREMENT" });
  };

  useEffect(() => {
    console.log("Result ", result)
    if (result) {
      if (result == "1x") {
        setSpinActive(false);
        setWallet(wallet + betAmount);
        toast(`1x Multiplied! Got -${betAmount}`, {
          icon: "👏",
        });
        betUpdateApi({ amount: betAmount, operation: "INCREMENT" });
        setBetAmount(0);
      } else if (result == "1.2x") {
        setWallet(wallet + betAmount * 1.2);
        setSpinActive(false);
        toast(`1.2x Multiplied! Got -${betAmount * 1.2}`, {
          icon: "👏",
        });
        betUpdateApi({ amount: betAmount * 1.5, operation: "INCREMENT" });
        setBetAmount(0);
      } else if (result == "1.5x") {
        setWallet(wallet + betAmount * 1.5);
        setSpinActive(false);
        toast(`1.5x Multiplied! Got -${betAmount * 1.5}`, {
          icon: "👏",
        });
        betUpdateApi({ amount: betAmount * 1.5, operation: "INCREMENT" });
        setBetAmount(0);
      } else if (result == "Free Spin") {
        toast(`You Got a Extra One Spin`, {
          icon: "👏",
        });
      } else if (result == "10x") {
        setWallet(wallet + betAmount * 10);
        setSpinActive(false);
        toast(`10x Multiplied! Got -${betAmount * 10}`, {
          icon: "👏",
        });

        betUpdateApi({ amount: betAmount * 10, operation: "INCREMENT" });
        setBetAmount(0);
      } else if (result == "15x") {
        setWallet(wallet + betAmount * 15);
        setSpinActive(false);
        toast(`15x Multiplied! Got -${betAmount * 15}`, {
          icon: "👏",
        });

        betUpdateApi({ amount: betAmount * 10, operation: "INCREMENT" });
        setBetAmount(0);
      } else if (result == "100x") {
        setSpinActive(false);
        toast(`100x Bonus Multiplied! Got -${betAmount * 100}`, {
          icon: "👏",
        });

        betUpdateApi({
          amount: betAmount * 100,
          operation: "INCREMENT",
          accountType: "BONUS",
        });
        setBetAmount(0);
      } else if (result == "Try") {
        setBetAmount(0);
        setSpinActive(false);

        toast(`Bad Luck! Try agin`, {
          icon: "😞",
        });
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [result]);

  return (
    <div className="flex flex-col justify-center">
      <div className="text-center my-5">
        <h3 className="text-white font-semibold text-2xl">Spin the Wheel</h3>
        <span className="text-xs text-brand">50x your wallet Fast</span>
      </div>
      <div className="mx-auto w-auto h-auto relative">
        <Roulette roulette={roulette} />
        <button
          type="button"
          onClick={handleSpin}
          disabled={!isSpinActive || isWheelSping}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-[#493D9E] my-2  text-white p-3 text-[10px] rounded-full  cursor-pointer  "
        >
          Spin
        </button>
      </div>

      <div className="bg-primary p-3 rounded-md border-2 border-border max-w-sm mx-auto mt-4">
        <label className="block text-center text-white text-sm font-medium mb-1">
          Bet On Best
        </label>
        <Input
          placeholder="Enter Bet Amount"
          type="number"
          value={amount}
          disabled={isSpinActive}
          onChange={(e) => setAmount(parseInt(e.target.value))}
        />
        <div className="flex items-center gap-2 my-2">
          <button
            disabled={isWheelSping}
            className="bg-primary border disabled:opacity-50 border-border rounded-sm cursor-pointer px-1 text-white"
            onClick={() => setAmount(100)}
          >
            100
          </button>
          <button
            disabled={isWheelSping}
            className="bg-primary border disabled:opacity-50 border-border rounded-sm cursor-pointer px-1 text-white"
            onClick={() => setAmount(150)}
          >
            150
          </button>
          <button
            disabled={isWheelSping}
            className="bg-primary border disabled:opacity-50 border-border rounded-sm cursor-pointer px-1 text-white"
            onClick={() => setAmount(200)}
          >
            200
          </button>
          <button
            disabled={isWheelSping}
            className="bg-primary disabled:opacity-50 border border-border rounded-sm cursor-pointer px-1 text-white"
            onClick={() => setAmount(500)}
          >
            500
          </button>
        </div>

        <Button
          disabled={isWheelSping || isSpinActive}
          onClick={handlePlaceBet}
          size={"sm"}
          className="w-full"
        >
          Place Bet
        </Button>
      </div>
    </div>
  );
};

export default LuckyWheel;
