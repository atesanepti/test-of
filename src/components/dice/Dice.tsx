"use client";
import { useState } from "react";
import NumberGrid from "./NumberGrid";
import RoleDice from "./RoleDice";
import Rule from "./Rule";
import { Input } from "../ui/input";
import { useDice } from "@/lib/store";
import { Button } from "../ui/button";
import { useUpdateForBetMutation } from "@/lib/features/api/betApiSlice";
import toast from "react-hot-toast";
import { random } from "@/lib/utils";

// Define the type for the props if necessary
// interface GamePlayProps {}

const Dice = () => {
  const [selectedNumber, setSelectedNumber] = useState<number | undefined>(
    undefined
  );
  const [currentDice, setCurrentDice] = useState<number>(1);

  const [error, setError] = useState<string>("");

  const [amount, setAmount] = useState(100);

  const { wallet, setWallet, betAmount, setBetAmount } = useDice(
    (state) => state
  );

  const [makeBetApi] = useUpdateForBetMutation();

  const rollDice = () => {
    if (selectedNumber === undefined) {
      setError("Number not selected !");
      return;
    }

    if (!betAmount) {
      setError("Place Bet First !");
      return;
    }

    setError("");
    const randomNumber = random(1, 6);
    setCurrentDice(randomNumber);

    if (selectedNumber === randomNumber) {
      toast(`Congratulation You won ${betAmount * 2}`, {
        icon: "👏",
      });
      setWallet(wallet + betAmount * 2);
      makeBetApi({ amount: betAmount * 2, operation: "INCREMENT" });
    } else {
      toast(`Bad Lucky`, {
        icon: "😞",
      });
    }
    setSelectedNumber(undefined);
    setBetAmount(0);
  };

  const handleBet = () => {
    if (amount < 100) {
      return toast.error("Minimum bet amount 100 BDT");
    }
    if (amount > wallet) {
      return toast.error("Recharge your wallet");
    }

    setWallet(wallet - amount);
    setBetAmount(amount);
    makeBetApi({ amount: amount, operation: "DECREMENT" });
  };

  return (
    <main className="pt-[70px] relative">
      <Rule>
        <button className="bg-input absolute top-5 left-5 text-xs text-white px-2 py-1 rounded-md cursor-pointer hover:pri/90 border border-border">
          How to play
        </button>
      </Rule>

      <div className=" flex justify-around items-center">
        <NumberGrid
          error={error}
          selectedNumber={selectedNumber}
          setSelectedNumber={setSelectedNumber}
        />
      </div>
      <RoleDice currentDice={currentDice} rollDice={rollDice} />

      <div className="bg-primary mt-5 border border-border p-3 rounded-md shadow-md w-72 mx-auto">
        <Input
          disabled={!!betAmount}
          placeholder="Enter Bet Amount"
          type="number"
          value={amount}
          onChange={(e) => setAmount(parseInt(e.target.value))}
        />
        <div className="flex items-center gap-2 ">
          <button
            disabled={!!betAmount}
            className="bg-primary disabled:opacity-50 p-2 rounded-sm cursor-pointer border border-border text-white text-xs"
            onClick={() => setAmount(100)}
          >
            100
          </button>

          <button
            disabled={!!betAmount}
            className="bg-primary disabled:opacity-50 p-2 rounded-sm cursor-pointer border border-border text-white text-xs"
            onClick={() => setAmount(150)}
          >
            150
          </button>

          <button
            disabled={!!betAmount}
            className="bg-primary disabled:opacity-50 p-2 rounded-sm cursor-pointer border border-border text-white text-xs"
            onClick={() => setAmount(200)}
          >
            200
          </button>

          <button
            disabled={!!betAmount}
            className="bg-primary disabled:opacity-50 p-2 rounded-sm cursor-pointer border border-border text-white text-xs"
            onClick={() => setAmount(500)}
          >
            500
          </button>
        </div>

        <Button
          className="mt-2"
          onClick={handleBet}
          size={"sm"}
          disabled={!!betAmount}
        >
          Place Bet
        </Button>
      </div>
    </main>
  );
};

export default Dice;
