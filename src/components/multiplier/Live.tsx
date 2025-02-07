import { UsersRound } from "lucide-react";
import React from "react";
import LiveUser from "./LiveUser";

const Live = () => {
  return (
    <div className="p-3 rounded-lg mb-4 border border-border">
      <h3 className="text-sm font-semibold mb-3 text-white flex items-center gap-1">
        <UsersRound className="w-4 h-4 " />
        Live - 3,400
      </h3>
      <div className="flex flex-col">
        <LiveUser amount={3000} isWin />
        <LiveUser amount={4500} isWin />
        <LiveUser amount={500} isWin />
        <LiveUser amount={900} isWin />
        <LiveUser amount={1000} isWin />
        <LiveUser amount={1000} isWin />
        <LiveUser amount={1000} isWin />
      </div>
    </div>
  );
};

export default Live;
