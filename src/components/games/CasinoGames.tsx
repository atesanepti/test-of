"use client";
import Image from "next/image";
import React from "react";
import multiplier from "@/../public/assets/games/multiplier.webp";
import slot from "@/../public/assets/games/slot.jpg";
import wheel from "@/../public/assets/games/wheel.jpg";
import toss from "@/../public/assets/games/toss.jpg";
import dice from "@/../public/assets/games/dice.jpg";
import Link from "next/link";
import { useTranslation } from "@/lib/store";

const CasinoGames = () => {
  const lan = useTranslation((state) => state.lan);
  return (
    <div className="grid grid-cols-2 gap-5">
      <Link href="/game/multiplier">
        <div>
          <Image
            className="w-full aspect-[10/5] object-cover rounded-md"
            src={multiplier}
            width={100}
            height={100}
            alt="Multiplier"
            placeholder="blur"
          />
          <span className="mt-2 text-xs text-white">
            {lan == "BN" ? "মাল্টিপ্লায়ার" : "Multiplier"}
          </span>
        </div>
      </Link>

      <Link href="/game/slot">
        <div>
          <Image
            className="w-full aspect-[10/5] object-cover rounded-md"
            src={slot}
            width={100}
            height={100}
            alt="Slot"
            placeholder="blur"
          />
          <span className="mt-2 text-xs text-white">
            {lan == "BN" ? "মেশিন স্লট" : "Machine Slot"}
          </span>
        </div>
      </Link>

      <Link href="/game/wheel">
        <div>
          <Image
            className="w-full aspect-[10/5] object-cover rounded-md"
            src={wheel}
            width={100}
            height={100}
            alt="Wheel"
            placeholder="blur"
          />
          <span className="mt-2 text-xs text-white">
            {lan == "BN" ? "রুলেট হুইল" : "Roulette Wheel"}
          </span>
        </div>
      </Link>

      <Link href="/game/dice">
        <div>
          <Image
            className="w-full aspect-[10/5] object-cover rounded-md"
            src={dice}
            alt="dice"
            placeholder="blur"
          />
          <span className="mt-2 text-xs text-white">
            {lan == "BN" ? "ডাইস" : "Dice"}
          </span>
        </div>
      </Link>

      <Link href="/game/toss">
        <div>
          <Image
            className="w-full aspect-[10/5] object-cover rounded-md"
            src={toss}
            alt="Heads - Tails"
            placeholder="blur"
          />
          <span className="mt-2 text-xs text-white">
            {lan == "BN" ? "হেডস/টেইলস" : "Heads/Tails"}
          </span>
        </div>
      </Link>
    </div>
  );
};

export default CasinoGames;
