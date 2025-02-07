import React from "react";

import Image from "next/image";

import multiplier from "@/../public/assets/games/multiplier.webp";
import slot from "@/../public/assets/games/slot.jpg";
import wheel from "@/../public/assets/games/wheel.jpg";
import toss from "@/../public/assets/games/toss.jpg";
import dice from "@/../public/assets/games/dice.jpg";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import Link from "next/link";
import Title from "./Title";

const GameList = () => {
  return (
    <div className="my-10">
      <Title title="Casino Games" />
      <Carousel>
        <CarouselContent>
          <CarouselItem className="basis-1/2 lg:basis-1/3 shadow-sm">
            <Link href="/game/wheel" className="relative ">
              <Image
                src={wheel}
                alt="wheel"
                className="w-full aspect-[10/5] object-cover rounded-md"
                placeholder="blur"
              />
              <span className="text-xs text-white game-title  absolute font-oswald font-semibold left-2 bottom-2">
                Roulette Wheel
              </span>
            </Link>
          </CarouselItem>
          <CarouselItem className="basis-1/2 lg:basis-1/3 shadow-sm">
            <Link href="/game/slot" className="relative ">
              <Image
                src={slot}
                alt="slot"
                className="w-full aspect-[10/5] object-cover rounded-md"
                placeholder="blur"
              />
              <span className="text-xs text-white game-title  absolute font-oswald font-semibold left-2 bottom-2">
                Machine Slot
              </span>
            </Link>
          </CarouselItem>
          <CarouselItem className="basis-1/2 lg:basis-1/3 shadow-sm">
            <Link href="/game/multiplier" className="relative ">
              <Image
                src={multiplier}
                alt="multiplier"
                className="w-full aspect-[10/5] object-cover rounded-md"
                placeholder="blur"
              />
              <span className="text-xs text-white game-title  absolute font-oswald font-semibold left-2 bottom-2">
                Score Multiplier
              </span>
            </Link>
          </CarouselItem>

          <CarouselItem className="basis-1/2 lg:basis-1/3 shadow-sm">
            <Link href="/game/dice" className="relative ">
              <Image
                src={dice}
                alt="Dice"
                width={100}
                height={100}
                className="w-full aspect-[10/5] object-cover rounded-md"
                placeholder="blur"
              />
              <span className="text-xs text-white game-title  absolute font-oswald font-semibold left-2 bottom-2">
                Dice
              </span>
            </Link>
          </CarouselItem>

          <CarouselItem className="basis-1/2 lg:basis-1/3 shadow-sm">
            <Link href="/game/toss" className="relative ">
              <Image
                width={100}
                height={100}
                src={toss}
                alt="Heads/Tails"
                className="w-full aspect-[10/5] object-cover rounded-md"
                placeholder="blur"
              />
              <span className="text-xs text-white game-title  absolute font-oswald font-semibold left-2 bottom-2">
                Heads/Tails
              </span>
            </Link>
          </CarouselItem>
        </CarouselContent>
      </Carousel>
    </div>
  );
};

export default GameList;
