"use client";
import React, { useRef } from "react";

import { SlotGameState, useSlot } from "@/lib/store";
import WinSlot from "./icons/WinSlot";
import LossSlot from "./icons/LossSlot";
import Placeholder from "./icons/Placeholder";
import { random } from "@/lib/utils";
import { Info } from "lucide-react";
import Tutorial from "./Tutorial";
import toast from "react-hot-toast";
import { format } from "@/lib/currency";

const Slot = () => {
  const takeOFFSound = useRef(new Audio("/assets/audio/take_off"));
  const victorySound = useRef(new Audio("/assets/audio/victory.mp3"));

  const slotClick = useRef(new Audio("/assets/audio/slot-in.mp3"));
  const wrong = useRef(new Audio("/assets/audio/wrong.mp3"));
  const correct = useRef(new Audio("/assets/audio/correct.wav"));
  const {
    slotState,
    gameState,
    profitAmount,
    prevSlotState,
    setGamState,
    setSlotState,
    setPrevSlotState,

    resetGame,
    setProfitAmount,
  } = useSlot((state) => state);

  const handleSlotClick = (index: number) => {
    slotClick.current.play();
    const winnerSlot = random(slotState.start, slotState.end);
    if (winnerSlot !== index) {
      toast(`You select Explosion`, {
        icon: "🔴",
      });
      setGamState(SlotGameState.LOST);
      setPrevSlotState({
        start: slotState.start,
        end: slotState.end,
        selectedSlot: index,
        winnerSlot: winnerSlot,
        validsSlots: Array.from({ length: slotState.end - slotState.start + 1 })
          .fill(0)
          .map((_, i) => slotState.start + i)
          .filter((value) => value !== index),
      });

      wrong.current.play();
      resetGame();
      takeOFFSound.current.play();

      return 1;
    } else {
      const newProfitAmount = slotState.start == 0 ? 2.5 : 2;
      setProfitAmount(Math.round(profitAmount * newProfitAmount));
      setPrevSlotState({
        start: slotState.start,
        end: slotState.end,
        selectedSlot: index,
        winnerSlot: winnerSlot,
        validsSlots: [
          ...Array.from({ length: slotState.end - slotState.start + 1 })
            .fill(0)
            .map((_, i) => slotState.start + i)
            .filter((value) => value !== index)
            .filter((value) => {
              if (index % 2 == 0) {
                return value % 2 !== 0;
              }
              return value % 2 == 0;
            }),
          index,
        ],
      });

      setSlotState({
        start: slotState.start - 4,
        end: slotState.end - 4,
      });

      correct.current.play();
    }

    if (slotState.start == 0 && slotState.end == 3) {
      toast(`You Won ${format(profitAmount)}`, {
        icon: "👏",
      });
      setGamState(SlotGameState.WIN);
      victorySound.current.play();
      resetGame();
      takeOFFSound.current.play();

      return 1;
    }
  };

  const isSlotDisable = (i: number) => {
    if (gameState !== SlotGameState.ACTIVE) {
      return true;
    }

    if (!(i >= slotState.start && i <= slotState.end)) {
      return true;
    }

    return false;
  };

  const checkPlaceholderVisibility = (index: number) => {
    const found = prevSlotState.find((s) => {
      if (index >= s.start && index <= s.end) {
        return s;
      }
    });
    if (!found) {
      return "";
    }

    return "hidden";
  };

  return (
    <div className="relative w-full bg-input px-4 py-2 backdrop-blur-lg rounded-lg border-2 border-border">
      <div className="flex justify-center gap-4 items-center ">
        <div className="flex flex-col items-center pb-4 ">
          <WinSlot />
          <span className="font-oswald text-[10px] text-xs text-white">
            Star
          </span>
        </div>

        <div className="flex flex-col items-center pb-4 ">
          <LossSlot />
          <span className="font-oswald text-[10px] text-xs text-white">
            Explosion
          </span>
        </div>
      </div>

      <div className="grid grid-cols-4 gap-1 md:gap-2 items-center w-max  max-w-4/5 md:max-w-[70%] mx-auto  ">
        {Array.from({ length: 16 }).map((_, i) => {
          return (
            <div className="relative w-12 md:w-16 aspect-square" key={i}>
              {prevSlotState.map((s, i2) => {
                if (i >= s.start && i <= s.end) {
                  return (
                    <div
                      className="w-full h-full flex items-center justify-center "
                      key={i2}
                    >
                      <>
                        {s.validsSlots?.includes(i) ? (
                          <div className="relative">
                            <WinSlot className="w-10" />
                            {i == s.selectedSlot && (
                              <div className="w-3 h-3 rounded-full bg-[#1C2A9E] absolute top-1 md:top-2 right-1 md:right-2 flex items-center justify-center">
                                <div className="w-1 h-1 rounded-full bg-white"></div>
                              </div>
                            )}
                          </div>
                        ) : (
                          <div className="relative">
                            <LossSlot className="w-10" />
                            {i == s.selectedSlot && (
                              <div className="w-3 h-3 rounded-full bg-[#971335] absolute top-1 md:top-2 right-1 md:right-2 flex items-center justify-center">
                                <div className="w-1 h-1 rounded-full bg-white"></div>
                              </div>
                            )}
                          </div>
                        )}
                      </>
                    </div>
                  );
                }

                return <div key={i2} className="hidden"></div>;
              })}
              <button
                className="cursor-pointer block w-full h-full absolute top-0 left-0 z-10"
                disabled={isSlotDisable(i)}
                onClick={() => handleSlotClick(i)}
              >
                <Placeholder className={checkPlaceholderVisibility(i)} />
              </button>
            </div>
          );
        })}
      </div>

      <Tutorial>
        <button className="absolute cursor-pointer top-3 left-3 bg-input rounded-lg p-1 flex items-center gap-1 border border-border">
          <Info className="w-3 h-3 text-muted" />
          <span className="text-[10px] text-muted ">How to Play</span>
        </button>
      </Tutorial>
    </div>
  );
};

export default Slot;
