"use client";
import React from "react";
import Image from "next/image";

import line_left from "@/../public/assets/line-left.png";
import line_right from "@/../public/assets/line-right.png";
import Accounts from "@/components/wallet/Accounts";
import WalletNavigation from "@/components/wallet/WalletNavigation";
import { useTranslation } from "@/lib/store";



const WalletPage = () => {
  const lan = useTranslation((state) => state.lan);
  return (
    <div>

      <div className="container py-2  px-2">
        <div>
          <h3 className="text-white text-lg font-semibold  relative  flex  justify-center items-center">
            <Image
              src={line_left}
              alt="line"
              className="absolute top-1/2 -translate-x-1/2 left-16 md:left-20 w-32 md:w-40"
            />
            {lan == "BN" ? "আমার ওয়ালেট" : "My Wallet"}
            <Image
              src={line_right}
              width={100}
              height={100}
              alt="line"
              className="absolute top-1/2 -translate-x-1/2  -right-16 md:-right-20  w-32 md:w-40"
            />
          </h3>
        </div>

        <Accounts />
        <WalletNavigation />
      </div>
    </div>
  );
};

export default WalletPage;
