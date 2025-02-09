"use client";
import React, { useState } from "react";
import { cn } from "@/lib/utils";
import { useTranslation } from "@/lib/store";

const AboutUs = () => {
  const [selectionShow, setSelectionShow] = useState(false);
  const lan = useTranslation((state) => state.lan);
  return (
    <div className="my-10">
      <h4 className="text-lg text-white font-medium text-center mb-2">
        {lan == "BN" ? "আমাদের সম্পর্কে" : "About Us"}
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
              {lan == "BN"
                ? "উত্তেজনাপূর্ণ গেমিং অভিজ্ঞতা"
                : "Exciting Gaming Experience"}
            </span>{" "}
            {lan == "BN"
              ? " – একটি স্থানে ক্যাসিনো গেমস এবং লাইভ স্পোর্টস বেটিংয়ের বিস্তৃত পরিসর উপভোগ করুন।"
              : " – Enjoy a wide range of casino games and live sports betting, all in one"}
          </p>
        </div>

        <div className="flex items-start gap-2">
          <div className="w-3 h-3 rounded-sm bg-blue-600"></div>
          <p className="text-sm text-muted-foreground">
            <span className="font-medium text-white">
              {lan == "BN" ? "ন্যায্য ও নিরাপদ বেটিং" : "Fair & Secure Betting"}
            </span>{" "}
            {lan == "BN"
              ? " – আমরা স্বচ্ছতা, ন্যায্য খেলা এবং আপনার মানসিক শান্তির জন্য শীর্ষ-স্তরের নিরাপত্তা অগ্রাধিকার দিই।"
              : " – We prioritize transparency, fair play, and top-notch security for your peace of mind."}
          </p>
        </div>
        <div className="flex items-start gap-2">
          <div className="w-3 h-3 rounded-sm bg-blue-600"></div>
          <p className="text-sm text-muted-foreground">
            <span className="font-medium text-white">
              {lan == "BN" ? "দ্রুত ও সহজ লেনদেন" : "Fast & Easy Transactions"}
            </span>

            {lan == "BN"
              ? " – দ্রুত জমা এবং উত্তোলন, যাতে আপনি কোনো বেট মিস না করেন।"
              : " – Quick deposits and withdrawals, so you never miss a bet."}
          </p>
        </div>
        <div className="flex items-start gap-2">
          <div className="w-3 h-3 rounded-sm bg-blue-600"></div>
          <p className="text-sm text-muted-foreground">
            <span className="font-medium text-white">
              {lan == "BN" ? "লাইভ স্পোর্টস অ্যাকশন" : "Live Sports Action"}
            </span>{" "}
            {lan == "BN"
              ? " – আমাদের লাইভ স্পোর্টস বেটিং ফিচারের মাধ্যমে আপনার প্রিয় দলগুলোর ওপর রিয়েল-টাইম বেট করুন।"
              : " – Bet on your favorite teams in real time with our live sports betting feature."}
          </p>
        </div>
        <div className="flex items-start gap-2">
          <div className="w-3 h-3 rounded-sm bg-blue-600"></div>
          <p className="text-sm text-muted-foreground">
            <span className="font-medium  text-white">
              {lan == "BN" ? "২৪/৭ গ্রাহক সহায়তা" : "24/7 Customer Support"}
            </span>{" "}
            {lan == "BN"
              ? " – আমাদের সাপোর্ট টিম সর্বদা প্রস্তুত, যে কোন সময়, যে কোন স্থানে আপনাকে সাহায্য করতে।"
              : " – Our support team is always ready to assist you anytime, anywhere."}
          </p>
        </div>
        <div className="flex items-start gap-2">
          <div className="w-3 h-3 rounded-sm bg-blue-600"></div>
          <p className="text-sm  text-muted-foreground">
            <span className="font-medium text-white">
              {lan == "BN"
                ? "উদার বোনাস ও প্রোমোশন"
                : "Generous Bonuses & Promotions"}
            </span>{" "}
            {lan == "BN"
              ? " – এক্সক্লুসিভ রিওয়ার্ড, ফ্রি বেট এবং দৈনিক অফার আনলক করুন।"
              : " – Unlock exclusive rewards, free bets, and daily offers."}
          </p>
        </div>
        <div className="flex items-start gap-2">
          <div className="w-3 h-3 rounded-sm bg-blue-600"></div>
          <p className="text-sm  text-muted-foreground">
            <span className="font-medium text-white">
              {lan == "BN"
                ? "মোবাইল-ফ্রেন্ডলি প্ল্যাটফর্ম"
                : "Mobile-Friendly Platform"}
            </span>{" "}
            {lan == "BN"
              ? " – আমাদের পুরোপুরি অপ্টিমাইজড মোবাইল অভিজ্ঞতা নিয়ে চলমানভাবে খেলা এবং বেটিং করুন।"
              : " – Play and bet on the go with our fully optimized mobile experience."}
          </p>
        </div>
        <div className="flex items-start gap-2">
          <div className="w-3 h-3 rounded-sm bg-blue-600"></div>
          <p className="text-sm text-muted-foreground">
            <span className="font-medium text-white ">
              {lan == "BN"
                ? "বিশ্বাসযোগ্য ও লাইসেন্সপ্রাপ্ত"
                : "Trusted & Licensed"}
            </span>{" "}
            {lan == "BN"
              ? " – আমরা নিরাপদ এবং বৈধ গেমিং পরিবেশ নিশ্চিত করার জন্য কঠোর নিয়মকানুনের অধীনে কাজ করি।"
              : " – We operate under strict regulations to ensure a safe and legal gaming environment."}
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
                {lan == "BN" ? "দেখুন" : "See"}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AboutUs;
