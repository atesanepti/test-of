import { Info } from "lucide-react";
import React from "react";

const InfoMessage = ({ message }: { message: string }) => {
  if (!message) return null;
  return (
    <div className="w-full flex items-center gap-2 rounded-lg px-3 py-2 bg-blue-700/15 text-blue-500 text-xs">
      <Info className="w-4 h-4" />
      {message}
    </div>
  );
};

export default InfoMessage;
