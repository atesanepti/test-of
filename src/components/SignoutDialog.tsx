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
import { signoutApi } from "@/actions/signout";
import { redirect } from "next/navigation";
import toast from "react-hot-toast";
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
