import { BadgeHelp } from "lucide-react";
import React from "react";

const SlideInfo = () => {
  return (
    <div className="my-4 overflow-hidden whitespace-nowrap">
      <div className="animate-marquee flex items-center gap-2 flex-nowrap">
        <div className="bg-blue-600 min-w-8 h-7 flex items-center justify-center">
          <BadgeHelp className="text-white w-4 h-4" />
        </div>

        <p className="flex-shrink-0 text-xs text-white">
          20% Instant Desposit Bonus! Refer Your Friend to Up to Data Bonus
          Cash!
        </p>
      </div>
    </div>
  );
};

export default SlideInfo;
