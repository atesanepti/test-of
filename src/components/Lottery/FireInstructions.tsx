"use client";
import { useTranslation } from "@/lib/store";
import React from "react";

const FireInstructions = () => {
  const lan = useTranslation((state) => state.lan);
  return (
    <div className="mt-6">
      <ul className="flex flex-col gap-3">
        <li className="flex items-center gap-1">
          <div className="w-3 h-3 bg-brand rounded-sm"> </div>
          <span className="text-muted-foreground text-xs ">
            {lan == "BN"
              ? "গেমে প্রবেশ করতে একটি টিকেট কিনুন"
              : "Purchase a tickey to enter the game"}
          </span>
        </li>
        <li className="flex items-center gap-1">
          <div className="w-3 h-3 bg-brand rounded-sm"> </div>
          <span className="text-muted-foreground text-xs ">
            {lan == "BN"
              ? "সৌভাগ্যবান বিজয়ী প্রধান পুরস্কারগুলোর মধ্যে পাবেন"
              : "Lucky winner will be receive one of the main prizes:"}
            <span className="font-semibold text-white">
              {lan == "BN"
                ? "সোনা, প্লাটিনাম বা হীরা"
                : "Gold, Platinum or Diamond"}
            </span>
          </span>
        </li>

        <li className="flex items-center gap-1">
          <div className="w-3 h-3 bg-brand rounded-sm"> </div>
          <span className="text-muted-foreground text-xs ">
            {lan == "BN"
              ? "আপনি যদি প্রধান পুরস্কার না জিতেন, তবুও আপনি পাবেন : "
              : " If you don&apos;t win a main prize, you will still recive a"}
            <span className="font-semibold text-white">
              {lan == "BN" ? "নগদ পুরস্কার" : "Cash reward"}
            </span>
          </span>
        </li>

        <li className="flex items-center gap-1">
          <div className="w-3 h-3 bg-brand rounded-sm"> </div>
          <span className="text-muted-foreground text-xs ">
            {lan == "BN" ? "শুভ কামনা!" : "Good Luck!"}
          </span>
        </li>
      </ul>
    </div>
  );
};

export default FireInstructions;
