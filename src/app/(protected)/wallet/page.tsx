import WalletHeader from "@/components/wallet/WalletHeader";
import React from "react";
import Image from "next/image";

// import line_left from "@/../public/assets/line-left.png";
// import line_right from "@/../public/assets/line-right.png";
import Accounts from "@/components/wallet/Accounts";
import WalletNavigation from "@/components/wallet/WalletNavigation";

const WalletPage = () => {
  return (
    <div>
      <WalletHeader />
      <div className="forg-bg pt-4">
        <div className="container py-2  px-2">
          <div>
            <h3 className="text-white text-lg font-semibold  relative  flex  justify-center items-center">
              <Image
                src={"/assets/line-left.png"}
                width={100}
                height={100}
                alt="line"
                className="absolute top-1/2 -translate-x-1/2 left-16 md:left-20 w-32 md:w-40"
              />
              My Wallet
              <Image
                src={"/assets/line-right.png"}
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
    </div>
  );
};

export default WalletPage;
