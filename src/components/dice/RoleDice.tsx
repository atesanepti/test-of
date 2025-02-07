"use client";

import Image from "next/image";
import { useRef } from "react";

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
        <Image
          src={`/assets/dice/side${currentDice}.png`}
          alt="dice side"
          width={100}
          height={100}
          className="w-30"
        />
      </div>
      <p>Click on the dice to roll</p>
    </div>
  );
};

export default RoleDice;
