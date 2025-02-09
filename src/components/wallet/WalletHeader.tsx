"use client";
import React from "react";
import { Avatar, AvatarImage } from "@/components/ui/avatar";

import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarSub,
  MenubarShortcut,
  MenubarTrigger,
  MenubarSubTrigger,
  MenubarSubContent,
} from "@/components/ui/menubar";
import { useCurrentUser } from "@/hook/useGetUser";
import { useTranslation } from "@/lib/store";
import { Gem } from "lucide-react";
import { signoutApi } from "@/actions/signout";
import { redirect } from "next/navigation";

const WalletHeader = () => {
  const user = useCurrentUser();
  const firstName = user?.fullName.split(" ")[0];
  const lastName = user?.fullName.replace(firstName!, "");

  const { lan, setLan } = useTranslation((state) => state);

  const handleToggleLan = (l: typeof lan) => {
    setLan(l);
  };

  const handleSignin = async() => {
    const response = await signoutApi();
    if (response.error) {
      throw new Error(response.error);
    }

    return redirect("/signin");
  };

  return (
    <div className="bg-primary sticky top-0 z-[10] left-0 w-full mx-auto md:w-[550px] rounded-b-none md:rounded-b-lg px-2 py-5 border-b border-b-border flex items-center justify-between">
      <div>
        <Menubar>
          <MenubarMenu>
            <MenubarTrigger asChild className="bg-transparent">
              <Avatar className="rounded-full bg-transparent">
                <AvatarImage
                  src="https://github.com/shadcn.png"
                  alt="@shadcn"
                />
                {/* <AvatarFallback>{`${firstName![0]}${
                  lastName?.[0] || ""
                }`}</AvatarFallback> */}
              </Avatar>
            </MenubarTrigger>

            <MenubarContent>
              <MenubarSub>
                <MenubarSubTrigger>
                  {lan == "BN" ? "ভাষা" : "Language"}
                </MenubarSubTrigger>
                <MenubarSubContent>
                  <MenubarItem onClick={() => handleToggleLan("EN")}>
                    {lan == "BN" ? "ইংরেজি" : "English"}
                    <MenubarShortcut>{lan == "EN" && "Set"}</MenubarShortcut>
                  </MenubarItem>
                  <MenubarItem onClick={() => handleToggleLan("BN")}>
                    {lan == "BN" ? "বাংলা" : "Bangla"}
                    <MenubarShortcut>{lan == "BN" && "Set"}</MenubarShortcut>
                  </MenubarItem>
                </MenubarSubContent>
              </MenubarSub>

              <MenubarItem onClick={handleSignin}>
                {lan == "BN" ? "সাইন আউট" : "Signout"}
              </MenubarItem>
            </MenubarContent>
          </MenubarMenu>
        </Menubar>
      </div>
      <h3 className="text-base font-semibold text-white">
        <Gem className="inline w-5 h-5 mr-2" />
        <span>{firstName}</span>
        <span className="text-brand">{lastName}</span>
      </h3>
    </div>
  );
};

export default WalletHeader;
