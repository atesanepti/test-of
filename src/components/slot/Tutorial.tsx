import React from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import WinSlot from "./icons/WinSlot";
import LossSlot from "./icons/LossSlot";
import Image from "next/image";
import wrong from "@/../public/assets/remove.png";

const Tutorial = ({ children }: { children: React.ReactNode }) => {
  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>How to play?</DialogTitle>
          <DialogDescription>
            <span className="text-[10px]">
              Indentify the Star box among the four- three are valid Star and
              one is Explosion
            </span>
          </DialogDescription>
        </DialogHeader>

        <div className="my-3 flex items-center justify-center gap-3">
          <WinSlot />
          <WinSlot />
          <div className="relative">
            <LossSlot />
            <Image
              src={wrong}
              alt="wrong"
              placeholder="blur"
              className="w-4 h-4 absolute left-1/2 -translate-x-1/2 top-15"
            />
          </div>

          <WinSlot />
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default Tutorial;
