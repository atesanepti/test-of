"use client";

import { useRef } from "react";
import Ludo from "./icons/Ludo";

interface RoleDiceProps {
  currentDice: number;
  rollDice: () => void;
}

const RoleDice: React.FC<RoleDiceProps> = ({ currentDice, rollDice }) => {
  const clickSound = useRef(new Audio("/assets/audio/click.wav"));
  return (
    <div className="mt-12 flex flex-col items-center justify-center">
      <div
        onClick={() => {
          clickSound.current.play();
          rollDice();
        }}
        className="cursor-pointer"
      >
        <Ludo side={currentDice} />
      </div>
      <p className="text-white text-sm ">Click on the dice to roll</p>
    </div>
  );
};

export default RoleDice;
