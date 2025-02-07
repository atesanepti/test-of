import React from "react";

const FireInstructions = () => {
  return (
    <div className="mt-6">
      <ul className="flex flex-col gap-3">
        <li className="flex items-center gap-1">
          <div className="w-3 h-3 bg-brand rounded-sm"> </div>
          <span className="text-muted-foreground text-xs ">
            Purchase a tickey to enter the game
          </span>
        </li>
        <li className="flex items-center gap-1">
          <div className="w-3 h-3 bg-brand rounded-sm"> </div>
          <span className="text-muted-foreground text-xs ">
            Lucky winner will be receive one of the main prizes:{" "}
            <span className="font-semibold text-white">
              Gold, Platinum or Diamond
            </span>
          </span>
        </li>

        <li className="flex items-center gap-1">
          <div className="w-3 h-3 bg-brand rounded-sm"> </div>
          <span className="text-muted-foreground text-xs ">
            If you don&apos;t win a main prize, you will still recive a 
            <span className="font-semibold text-white">Cash reward</span>
          </span>
        </li>

        <li className="flex items-center gap-1">
          <div className="w-3 h-3 bg-brand rounded-sm"> </div>
          <span className="text-muted-foreground text-xs ">Good Luck!</span>
        </li>
      </ul>
    </div>
  );
};

export default FireInstructions;
