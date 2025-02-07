"use client";
import React from "react";

import { useFetchWalletDataQuery } from "@/lib/features/api/walletApiSlice";
import { format } from "@/lib/currency";

const Accounts = () => {
  const { data } = useFetchWalletDataQuery();

  const mainAccount = data?.payload?.mainWallet;
  const bonusAccount = data?.payload.bonusWallet;

  return (
    <div className="w-full flex items-center gap-3 my-3">
      <div className="flex-1 bg-input border border-muted/15 flex flex-col  rounded-lg  p-3 ">
        <div className="flex items-center">
          <h4 className="text-white text-lg font-medium">
            {mainAccount ? format(mainAccount.account) : format(0)}
          </h4>
        </div>
        <span className="text-muted-foreground text-xs">Main account</span>
      </div>

      <div className="flex-1 bg-input border border-muted/15 flex flex-col  rounded-lg  p-3 ">
        <div className="flex items-center">
          <h4 className="text-white text-lg font-medium">
            {bonusAccount ? format(bonusAccount.account) : format(0)}
          </h4>
        </div>

        <span className="text-muted-foreground text-xs">Bouns account</span>
      </div>
    </div>
  );
};

export default Accounts;
