"use client";

import { useRef } from "react";

// Define the props types for the component
interface NumberGridProps {
  error: string;
  selectedNumber: number | undefined;
  setSelectedNumber: (value: number | undefined) => void;
}

const NumberGrid: React.FC<NumberGridProps> = ({
  error,
  selectedNumber,
  setSelectedNumber,
}) => {
  const selectSound = useRef(new Audio("/assets/audio/select.mp3"));
  const arrayNumber = [1, 2, 3, 4, 5, 6];

  return (
    <div>
      <p className="text-red-500 text-base">{error}</p>
      <div className="flex gap-6">
        {arrayNumber.map((value, id) => (
          <div
            key={id}
            className={`h-18 w-18 grid place-items-center text-2xl px-3 font-bold cursor-pointer rounded-sm ${
              value === selectedNumber
                ? "bg-black text-white"
                : "bg-white text-black"
            }`}
            onClick={() => {
              selectSound.current.play();
              setSelectedNumber(value);
            }}
          >
            {value}
          </div>
        ))}
      </div>
      <p className="text-base text-white">Selected number</p>
    </div>
  );
};

export default NumberGrid;
