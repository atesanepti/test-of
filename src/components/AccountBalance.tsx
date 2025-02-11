"use client";
import React from "react";

import { Plus } from "lucide-react";
import { format } from "@/lib/currency";
import { useFetchWalletDataQuery } from "@/lib/features/api/walletApiSlice";
import { useTranslation } from "@/lib/store";
import Link from "next/link";

const AccountBalance = () => {
  const { data } = useFetchWalletDataQuery();
  const mainAccount = data?.payload.mainWallet;

  const lan = useTranslation((state) => state.lan);
  return (
    <Link
      href={"/deposit"}
      className="bg-primary border border-border px-3 py-2 rounded-full relative flex gap-2 items-center cursor-pointer"
    >
      <span className="text-xs font-medium text-white ml-4 ">
        {format(mainAccount?.account || 0, lan == "BN" ? "bn-BD" : "en-BD")}
      </span>

      <div className=" p-1 h-full flex items-center justify-center rounded-full absolute left-0 top-1/2 -translate-y-1/2">
        <Plus className="w-3 h-3 text-white" />
      </div>
    </Link>
  );
};

export default AccountBalance;
