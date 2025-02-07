import React from "react";

import {
  TrendingUp,
  LoaderPinwheel,
  Grid3x3,
  Coins,
  Dices,
} from "lucide-react";
import { format } from "@/lib/currency";
import { Games } from "@/types/enum";

const GameHeader = ({ account, game }: { account: number; game: Games }) => {
  return (
    <>
      <div className="h-[70px] bg-primary border border-border  shadow-md flex items-center justify-between px-10 py-3 rounded-full mb-3">
        <div className="flex items-center gap-2">
          {game == Games.MULTIPLIER && (
            <TrendingUp className="w-5 h-4 text-white" />
          )}
          {game == Games.SLOT && <Grid3x3 className="w-5 h-4 text-white" />}
          {game == Games.WHEEL && (
            <LoaderPinwheel className="w-5 h-4 text-white" />
          )}
          {game == Games.TOSS && <Coins className="w-5 h-4 text-white" />}
          {game == Games.DICE && <Dices className="w-5 h-4 text-white" />}

          <h4 className="text-base text-white font-semibold font-oswald">
            {game == Games.MULTIPLIER && "Multiplier"}
            {game == Games.SLOT && "Machine slot"}
            {game == Games.WHEEL && "Lucky Wheel"}
            {game == Games.TOSS && "Coin Toss"}
            {game == Games.DICE && "Dice"}
          </h4>
        </div>
        <div className="flex items-center gap-1  p-2">
          <h4 className="text-white text-sm font-medium">{format(account)} </h4>
        </div>
      </div>
    </>
  );
};

export default GameHeader;
