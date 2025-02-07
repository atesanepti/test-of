"use client";
import { cn } from "@/lib/utils";
import { Bolt, Gamepad2, Wallet, WandSparkles } from "lucide-react";
import Link from "next/link";
import React from "react";
import { usePathname } from "next/navigation";

const TabLayout = ({ children }: { children: React.ReactNode }) => {
  const pathname = usePathname();

  return (
    <div className="container relative flex flex-col h-screen">
      <main className="flex-1 overflow-auto scrollbar-hide">{children}</main>
      <nav className=" flex items-center justify-between py-2  rounded-t-2xl bg-primary border border-border">
        <Link
          href="/"
          className={cn(
            "text-muted-foreground hover:text-muted-foreground/90 text-xs font-semibold font-oswald flex items-center flex-col p-2 rounded-sm flex-1",
            `${pathname === "/" && "text-brand hover:text-brand/90"}`
          )}
        >
          <Bolt className=" w-5 h-5 mb-1" />
          HOME
        </Link>

        {/* <Link
          href="/sports"
          className={cn(
            "text-muted-foreground hover:text-muted-foreground/90 text-xs font-semibold  font-oswald flex items-center flex-col p-2 rounded-sm flex-1",
            `${pathname.match("/sports") && "text-brand hover:text-brand/90"}`
          )}
        >
          <Radio className=" w-5 h-5 mb-1" />
          SPORTS
        </Link> */}

        <Link
          href="/games"
          className={cn(
            "text-muted-foreground hover:text-muted-foreground/90 text-xs font-semibold font-oswald flex items-center flex-col p-2 rounded-sm flex-1",
            `${pathname.match("/games") && "text-brand hover:text-brand/90"}`
          )}
        >
          <Gamepad2 className=" w-5 h-5 mb-1" />
          GAMES
        </Link>

        <Link
          href="/lottery"
          className={cn(
            "text-muted-foreground hover:text-muted-foreground/90 text-xs font-semibold font-oswald flex items-center flex-col p-2 rounded-sm flex-1",
            `${pathname.match("/lottery") && "text-brand hover:text-brand/90"}`
          )}
        >
          <WandSparkles className=" w-5 h-5 mb-1" />
          Lottery
        </Link>

        <Link
          href="/wallet"
          className={cn(
            "text-muted-foreground hover:text-muted-foreground/90 text-xs font-semibold font-oswald flex items-center flex-col p-2 rounded-sm flex-1",
            `${pathname.match("/wallet") && "text-brand hover:text-brand/90"}`
          )}
        >
          <Wallet className=" w-5 h-5 mb-1" />
          WALLET
        </Link>
      </nav>
    </div>
  );
};

export default TabLayout;
