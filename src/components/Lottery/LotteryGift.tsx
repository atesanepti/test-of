import React from "react";

import gold from "@/../public/assets/lottery/glod.png";
import diamond from "@/../public/assets/lottery/diamond.png";
import plati from "@/../public/assets/lottery/plati.png";
import Image from "next/image";

const LotteryGift = () => {
  return (
    <div className="w-full overflow-hidden whitespace-nowrap ">
      <div className="animate-marquee-reverse flex min-w-full  gap-3">
        <div className=" max-w-[260px] flex-shrink-0 items-center gap-2 relative bg-primary border border-border rounded-sm p-2">
          <Image
            src={gold}
            alt="Gold"
            className=" rounded-sm object-cover"
            placeholder="blur"
          />
        </div>
        <div className=" max-w-[260px] flex-shrink-0 items-center gap-2 relative bg-primary border border-border rounded-sm p-2">
          <Image
            src={diamond}
            alt="Diamond"
            className=" rounded-sm object-cover"
            placeholder="blur"
          />
        </div>
        <div className=" max-w-[260px] flex-shrink-0 items-center gap-2 relative bg-primary border border-border rounded-sm p-2">
          <Image
            src={plati}
      
            alt="Pati"
            className=" rounded-sm object-cover"
            placeholder="blur"
          />
        </div>
      </div>
    </div>
  );
};

export default LotteryGift;
