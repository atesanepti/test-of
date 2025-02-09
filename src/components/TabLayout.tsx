"use client";
import { cn } from "@/lib/utils";
import { Bolt, Gamepad2, Wallet, WandSparkles } from "lucide-react";
import Link from "next/link";
import React from "react";
import { usePathname } from "next/navigation";
import { useTranslation } from "@/lib/store";

const TabLayout = ({ children }: { children: React.ReactNode }) => {
  const pathname = usePathname();
  const lan = useTranslation((state) => state.lan);
  return (
    <div className=" relative  h-screen">
      <main className=" overflow-auto scrollbar-hide pb-16">{children}</main>

      <nav className="fixed bottom-0 left-0 md:left-[49.5%] md:-translate-x-1/2 w-full md:w-[550px] flex items-center justify-between py-2  rounded-t-2xl bg-primary border border-border">
        <Link
          href="/"
          className={cn(
            "text-muted-foreground hover:text-muted-foreground/90 text-xs font-semibold font-oswald flex items-center flex-col p-2 rounded-sm flex-1",
            `${pathname === "/" && "text-brand hover:text-brand/90"}`
          )}
        >
          <Bolt className=" w-5 h-5 mb-1" />

          {lan == "BN" ? "হোম" : "HOME"}
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

          {lan == "BN" ? "গেমস" : "GAMES"}
        </Link>

        <Link
          href="/lottery"
          className={cn(
            "text-muted-foreground hover:text-muted-foreground/90 text-xs font-semibold font-oswald flex items-center flex-col p-2 rounded-sm flex-1",
            `${pathname.match("/lottery") && "text-brand hover:text-brand/90"}`
          )}
        >
          <WandSparkles className=" w-5 h-5 mb-1" />

          {lan == "BN" ? "লটারী" : "Lottery"}
        </Link>

        <Link
          href="/wallet"
          className={cn(
            "text-muted-foreground hover:text-muted-foreground/90 text-xs font-semibold font-oswald flex items-center flex-col p-2 rounded-sm flex-1",
            `${pathname.match("/wallet") && "text-brand hover:text-brand/90"}`
          )}
        >
          <Wallet className=" w-5 h-5 mb-1" />

          {lan == "BN" ? "ওয়ালেট" : "WALLET"}
        </Link>
      </nav>
    </div>
  );
};

export default TabLayout;
