"use client";
import { useFetchUnSeenLogsCountQuery } from "@/lib/features/api/logApiSlice";
import {
  Gamepad2,
  HandCoins,
  Handshake,
  History,
  TextCursorInput,
} from "lucide-react";
import Link from "next/link";
import React from "react";

const WalletNavigation = () => {
  const { data } = useFetchUnSeenLogsCountQuery();
  const logCount = data?.payload?.unSeenLogs || 0;
  return (
    <div className=" px-2 py-5  flex items-center justify-between">
      <Link
        href={"/deposit"}
        className="flex flex-col items-center justify-center bg-input border border-muted/15 rounded-sm text-[10px] text-muted-foreground hover:text-white/80 transition-colors w-[70px] p-2"
      >
        <HandCoins className="w-4 h-4" />
        Deposit
      </Link>
      <Link
        href={"/withdrawal"}
        className="flex flex-col items-center justify-center bg-input border border-muted/15 rounded-sm text-[10px] text-muted-foreground hover:text-white/80 w-[70px] p-2"
      >
        <TextCursorInput className="w-4 h-4" />
        Withdrawal
      </Link>
      <Link
        href={"/games"}
        className="flex flex-col items-center justify-center bg-input border border-muted/15 rounded-sm text-[10px] text-muted-foreground hover:text-white/80 w-[70px] p-2"
      >
        <Gamepad2 className="w-4 h-4" />
        Games
      </Link>
      <Link
        href={"/logs"}
        className="relative flex flex-col items-center justify-center bg-input border border-muted/15 rounded-sm text-[10px] text-muted-foreground hover:text-white/80 w-[70px] p-2"
      >
        <History className="w-4 h-4" />
        Logs
        {!!logCount && (
          <span className="text-[7px] text-white bg-destructive w-2 h-2 rounded-full absolute top-2 right-4"></span>
        )}
      </Link>
      <Link
        href={"/refer-code"}
        className="flex flex-col items-center justify-center bg-input border border-muted/15 rounded-sm text-[10px] text-muted-foreground hover:text-white/80 w-[70px] p-2"
      >
        <Handshake className="w-4 h-4" />
        My Refer
      </Link>
    </div>
  );
};

export default WalletNavigation;
