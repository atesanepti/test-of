"use client";
import Link from "next/link";
import React from "react";

import Contact from "./Contact";
import { useCurrentUser } from "@/hook/useGetUser";
import { useTranslation } from "@/lib/store";

const Footer = () => {
  const user = useCurrentUser();
  const lan = useTranslation((state) => state.lan);
  return (
    <div className="mt-6 py-8 px-6 border-t border-t-border bg-primary">
      <div className="flex justify-between pb-4">
        <div>
          <h5
            className="text-white text-sm font-semibold 
                "
          >
            {lan == "BN" ? "কনটেন্ট" : "Content"}
          </h5>
          <ul className="mt-2 flex flex-col gap-3">
            <li className="text-xs text-muted-foreground hover:underline hover:text-white transition-all">
              {lan == "BN" ? "লাইভ স্পোর্টস" : "Live Sports"}
            </li>
            <li className="text-xs text-muted-foreground hover:underline hover:text-white transition-all">
              {lan == "BN" ? "লাইভ ওডস" : "Live Odds"}
            </li>
            <li className="text-xs text-muted-foreground hover:underline hover:text-white transition-all">
              {lan == "BN" ? "ক্যাসিনো গেম" : "Casino Game"}
            </li>
            <li className="text-xs text-muted-foreground hover:underline hover:text-white transition-all">
              {lan == "BN" ? "লাকি ড্র" : "Lucky Draw"}
            </li>

            <li className="text-xs text-muted-foreground hover:underline hover:text-white transition-all">
              {lan == "BN" ? "রেফার বোনাস" : "Refer Bonus"}
            </li>
            <li className="text-xs text-muted-foreground hover:underline hover:text-white transition-all">
              {lan == "BN" ? "ডিপোজিট বোনাস" : "Desposit Bonus"}
            </li>
            <li className="text-xs text-muted-foreground hover:underline hover:text-white transition-all">
              {lan == "BN" ? "অ্যাভিয়েটর" : "Aviator"}
            </li>
            <li className="text-xs text-muted-foreground hover:underline hover:text-white transition-all">
              {lan == "BN" ? "ক্র্যাশ গেম" : "Crash Game"}
            </li>
          </ul>
        </div>

        <div className="flex flex-col gap-10">
          <div>
            <h5
              className="text-white text-sm font-semibold 
                "
            >
              {lan == "BN" ? "নেভিগেশন" : "Navigation"}
            </h5>
            <ul className="mt-2 flex flex-col gap-3">
              {!user && (
                <>
                  <li className="text-xs text-muted-foreground hover:underline hover:text-white transition-all">
                    <Link href="/signin">
                      {lan == "BN" ? "সাইন ইন" : "Signin"}
                    </Link>
                  </li>
                  <li className="text-xs text-muted-foreground hover:underline hover:text-white transition-all">
                    <Link href="/signup">
                      {lan == "BN" ? "সাইন আপ" : "Signup"}
                    </Link>
                  </li>
                </>
              )}
              <li className="text-xs text-muted-foreground hover:underline hover:text-white transition-all">
                {lan == "BN" ? "লটারী" : "Lottery"}
              </li>
              <li className="text-xs text-muted-foreground hover:underline hover:text-white transition-all">
                {lan == "BN" ? "খেলা" : "Sports"}
              </li>
              <li className="text-xs text-muted-foreground hover:underline hover:text-white transition-all">
                {lan == "BN" ? "গেমস" : "Games"}
              </li>
            </ul>
          </div>
          <Contact />
        </div>
      </div>

      <div className="flex items-center justify-center pt-3 border-t border-t-border">
        <span className="text-xs text-muted-foreground">
          {lan == "BN"
            ? "ক্যাসিনোসিটি কোম্পানি প্রজেক্ট"
            : "Casinocity Company Project"}
        </span>
      </div>
    </div>
  );
};

export default Footer;
