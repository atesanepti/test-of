import React from "react";

import user from "@/../public/assets/man.png";
import Image from "next/image";

const LiveUser = ({ isWin, amount }: { isWin: boolean; amount: number }) => {
  return (
    <div className="flex items-center justify-between py-2 px-2 border-b border-b-border bg-primary">
      <div className="flex items-center gap-1">
        <Image
          src={user}
          alt="user"
          className="w-5 h-5 rounded-full object-cover"
          placeholder="blur"
        />

        <span className="text-[10px] text-white">01*******8</span>
      </div>

      {!isWin && <span className="text-destructive text-xs">-{amount}</span>}
      {isWin && <span className="text-emerald-500 text-xs">+{amount}</span>}
    </div>
  );
};

export default LiveUser;
