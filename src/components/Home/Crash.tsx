import React from "react";

import aviator from "@/../public/assets/games/aviator.webp";
import Image from "next/image";
import Link from "next/link";
import { Gamepad, Play } from "lucide-react";
import { Button } from "../ui/button";

const Crash = () => {
  return (
    <div className="my-10">
      <div className="p-2 flex items-start justify-between gap-2">
        <div className="flex-1">
          <div className="flex gap-1 justify-start">
            <Gamepad className="w-4 h-4 text-white ml-2" />
            <span className="text-white text-sm font-medium">
              Aviator Online
            </span>
          </div>
          <span className="mt-2 text-xs text-muted-foreground ">
            Get ready for an adrenaline-pumping gaming experience with Aviator,
          </span>
          <br></br>
          <Link href={"/aviator"}>
            <Button size={"sm"} className="mt-3">
              <Play className="w-4 h-4 " />
              Play
            </Button>
          </Link>
        </div>
        <Image
          src={aviator}
          alt="Crash"
          className="w-[180px] aspect-video object-cover rounded-lg"
        />
      </div>
    </div>
  );
};

export default Crash;
