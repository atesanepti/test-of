"use client";
import React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogDescription,
} from "@/components/ui/dialog";
import SigunoutButton from "./SigunoutButton";

const SignoutDialog = ({ children }: { children: React.ReactNode }) => {
  
  return (
    <Dialog>
      <DialogTrigger>{children}</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Are you absolutely sure?</DialogTitle>
          <DialogDescription></DialogDescription>
        </DialogHeader>
        <div>
          <SigunoutButton />
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default SignoutDialog;
