import { getCurrentUser } from "@/lib/getCurrentUser";
import Link from "next/link";
import React from "react";

import Contact from "./Contact";

const Footer = async () => {
  const user = await getCurrentUser();
  return (
    <div className="mt-6 py-8 px-6 border-t border-t-border bg-primary">
      <div className="flex justify-between pb-4">
        <div>
          <h5
            className="text-white text-sm font-semibold 
                "
          >
            Content
          </h5>
          <ul className="mt-2 flex flex-col gap-3">
            <li className="text-xs text-muted-foreground hover:underline hover:text-white transition-all">
              Live Sports
            </li>
            <li className="text-xs text-muted-foreground hover:underline hover:text-white transition-all">
              Live Odds
            </li>
            <li className="text-xs text-muted-foreground hover:underline hover:text-white transition-all">
              Casino Game
            </li>
            <li className="text-xs text-muted-foreground hover:underline hover:text-white transition-all">
              Lucky Draw
            </li>
            <li className="text-xs text-muted-foreground hover:underline hover:text-white transition-all">
              Gibway
            </li>
            <li className="text-xs text-muted-foreground hover:underline hover:text-white transition-all">
              Refer Bonus
            </li>
            <li className="text-xs text-muted-foreground hover:underline hover:text-white transition-all">
              Desposit Bonus
            </li>
            <li className="text-xs text-muted-foreground hover:underline hover:text-white transition-all">
              Aviator
            </li>
            <li className="text-xs text-muted-foreground hover:underline hover:text-white transition-all">
              Crash Game
            </li>
          </ul>
        </div>

        <div className="flex flex-col gap-10">
          <div>
            <h5
              className="text-white text-sm font-semibold 
                "
            >
              Navigation
            </h5>
            <ul className="mt-2 flex flex-col gap-3">
              {!user && (
                <>
                  <li className="text-xs text-muted-foreground hover:underline hover:text-white transition-all">
                    <Link href="/signin">Signin</Link>
                  </li>
                  <li className="text-xs text-muted-foreground hover:underline hover:text-white transition-all">
                    <Link href="/signup">Signup</Link>
                  </li>
                </>
              )}
              <li className="text-xs text-muted-foreground hover:underline hover:text-white transition-all">
                Lottery
              </li>
              <li className="text-xs text-muted-foreground hover:underline hover:text-white transition-all">
                Sports
              </li>
              <li className="text-xs text-muted-foreground hover:underline hover:text-white transition-all">
                Games
              </li>
            </ul>
          </div>
          <Contact />
        </div>
      </div>

      <div className="flex items-center justify-center pt-3 border-t border-t-border">
        <span className="text-xs text-muted-foreground">
          Casinocity Company Project
        </span>
      </div>
    </div>
  );
};

export default Footer;
