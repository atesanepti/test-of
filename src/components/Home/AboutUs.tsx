"use client";
import React, { useState } from "react";
import { cn } from "@/lib/utils";

const AboutUs = () => {
  const [selectionShow, setSelectionShow] = useState(false);

  return (
    <div className="my-10">
      <h4 className="text-lg text-white font-medium text-center mb-2">
        About Us
      </h4>

      <div
        className={cn(
          "relative p-2 flex flex-col gap-4 overflow-y-hidden",
          `${selectionShow ? "h-auto" : "h-[240px]"}`
        )}
      >
        <div className="flex items-start gap-2">
          <div className="w-3 h-3 rounded-sm bg-blue-600"></div>
          <p className="text-sm text-muted-foreground">
            <span className="font-medium text-white">
              Exciting Gaming Experience{" "}
            </span>{" "}
            – Enjoy a wide range of casino games and live sports betting, all in
            one place.
          </p>
        </div>

        <div className="flex items-start gap-2">
          <div className="w-3 h-3 rounded-sm bg-blue-600"></div>
          <p className="text-sm text-muted-foreground">
            <span className="font-medium text-white">
              Fair & Secure Betting{" "}
            </span>{" "}
            – We prioritize transparency, fair play, and top-notch security for
            your peace of mind.
          </p>
        </div>

        <div className="flex items-start gap-2">
          <div className="w-3 h-3 rounded-sm bg-blue-600"></div>
          <p className="text-sm text-muted-foreground">
            <span className="font-medium text-white">
              Fast & Easy Transactions{" "}
            </span>
            – Quick deposits and withdrawals, so you never miss a bet.
          </p>
        </div>

        <div className="flex items-start gap-2">
          <div className="w-3 h-3 rounded-sm bg-blue-600"></div>
          <p className="text-sm text-muted-foreground">
            <span className="font-medium text-white">Live Sports Action </span>{" "}
            – Bet on your favorite teams in real time with our live sports
            betting feature.
          </p>
        </div>

        <div className="flex items-start gap-2">
          <div className="w-3 h-3 rounded-sm bg-blue-600"></div>
          <p className="text-sm text-muted-foreground">
            <span className="font-medium  text-white">
              24/7 Customer Support{" "}
            </span>{" "}
            – Our support team is always ready to assist you anytime, anywhere.
          </p>
        </div>

        <div className="flex items-start gap-2">
          <div className="w-3 h-3 rounded-sm bg-blue-600"></div>
          <p className="text-sm  text-muted-foreground">
            <span className="font-medium text-white">
              Generous Bonuses & Promotions{" "}
            </span>{" "}
            – Unlock exclusive rewards, free bets, and daily offers.
          </p>
        </div>

        <div className="flex items-start gap-2">
          <div className="w-3 h-3 rounded-sm bg-blue-600"></div>
          <p className="text-sm  text-muted-foreground">
            <span className="font-medium text-white">
              Mobile-Friendly Platform
            </span>{" "}
            – Play and bet on the go with our fully optimized mobile experience.
          </p>
        </div>

        <div className="flex items-start gap-2">
          <div className="w-3 h-3 rounded-sm bg-blue-600"></div>
          <p className="text-sm text-muted-foreground">
            <span className="font-medium text-white ">Trusted & Licensed </span>{" "}
            – We operate under strict regulations to ensure a safe and legal
            gaming environment.
          </p>
        </div>

        {!selectionShow && (
          <div
            className={cn(
              "absolute left-0 bottom-0 w-full h-32 bg-gradient-to-t from-[#131620] via-[#131620] via-10% to-transparent"
            )}
          >
            <div className="w-max mx-auto">
              <button
                onClick={() => setSelectionShow(true)}
                className="bg-primary border absolute left-1/2 -translate-x-1/2 bottom-8 border-border px-2 py-1 rounded-lg cursor-pointer text-xs text-white"
              >
                Spand
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AboutUs;
