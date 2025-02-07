"use client";
import React from "react";
import { Button } from "./ui/button";
import { LogOut } from "lucide-react";
import { signoutApi } from "@/actions/signout";
import toast from "react-hot-toast";
import { redirect } from "next/navigation";

const SigunoutButton = () => {
  const handleSignin = () => {
    signoutApi().then((res) => {
      if (res.success) {
        redirect("/signin");
      } else if (res.error) {
        toast.error(res.error);
      }
    });
  };

  return (
    <Button onClick={handleSignin} size={"sm"} variant={"secondary"}>
      Signout
      <LogOut className="w-4 h-5 " />
    </Button>
  );
};

export default SigunoutButton;
