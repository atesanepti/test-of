"use client";
import React from "react";

import { useRouter } from "next/navigation";
import { Plus } from "lucide-react";
import { format } from "@/lib/currency";
import { useFetchWalletDataQuery } from "@/lib/features/api/walletApiSlice";

const AccountBalance = () => {
  const router = useRouter();
  const { data } = useFetchWalletDataQuery();
  const mainAccount = data?.payload.mainWallet;
  return (
    <div className="bg-primary border border-border px-3 py-2 rounded-full relative flex gap-2 items-center">
      <span className="text-xs font-medium text-white ml-4 ">
        {format(mainAccount?.account || 0)}
      </span>

      <div className=" p-1 h-full flex items-center justify-center rounded-full absolute left-0 top-1/2 -translate-y-1/2">
        <Plus
          onClick={() => router.push("/deposit")}
          className="w-3 h-3 text-white"
        />
      </div>
    </div>
  );
};

export default AccountBalance;
