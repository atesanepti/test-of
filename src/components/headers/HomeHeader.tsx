"use client";
import { UserRole } from "@prisma/client";
import React from "react";
import AdminNavigation from "../admin/AdminNavigation";
import { Menu, User } from "lucide-react";
import AccountBalance from "../AccountBalance";
import Logo from "../Logo";
import Link from "next/link";
import { Button } from "../ui/button";
import { useCurrentUser } from "@/hook/useGetUser";
import { useTranslation } from "@/lib/store";



const Header = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="bg-primary sticky top-0 z-[10] left-0 w-full mx-auto md:w-[550px] rounded-b-none md:rounded-b-lg px-2 py-5 border-b border-b-border flex items-center justify-between">
      {children}
    </div>
  );
};

const HomeHeader = () => {
  const user = useCurrentUser();
  const role = user?.role;

  if (user && role === UserRole.ADMIN) {
    return (
      <Header>
        <HomeHeaderAdmin />
      </Header>
    );
  } else if (user && role === UserRole.AGENT) {
    return (
      <Header>
        <HomeHeaderAgent />
      </Header>
    );
  }

  return (
    <Header>
      <HomeHeaderUser />
    </Header>
  );
};

const HomeHeaderAdmin = () => {
  return (
    <>
      <Logo />
      <div className="flex gap-2 items-center">
        <Link
          href="/admin/dashboard"
          className=" px-2 py-1 cursor-pointer rounded-lg text-white bg-[#8B5DFF] text-xs"
        >
          Admin
        </Link>
        <AdminNavigation>
          <Menu className="text-white w-5 h-5 cursor-pointer" />
        </AdminNavigation>
      </div>
    </>
  );
};
const HomeHeaderAgent = () => {
  return (
    <>
      <Logo />
      <div className="flex gap-2 items-center">
        <Link
          href="/admin/dashboard"
          className=" px-2 py-1 cursor-pointer rounded-lg text-white bg-[#5B913B] text-xs"
        >
          Agent
        </Link>
        <AdminNavigation>
          <Menu className="text-white w-5 h-5 cursor-pointer" />
        </AdminNavigation>
      </div>
    </>
  );
};

const HomeHeaderUser = () => {
  const user = useCurrentUser();
  const lan = useTranslation((state) => state.lan);
  return (
    <>
      <Logo />
      <div className="flex items-center gap-3">
        {!user && (
          <div className="flex items-center gap-2">
            <Link href="/signup">
              <Button size={"sm"}>{lan == "BN" ? "সাইন আপ" : "Signup"}</Button>
            </Link>
            <Link href="/signin">
              <Button size={"sm"} variant={"secondary"}>
                {lan == "BN" ? "সাইন ইন" : "Signin"}
              </Button>
            </Link>
          </div>
        )}
        <div className="flex items-center gap-2">
          <span className="text-sm text-white flex gap-1 items-center"><User className="w-4 h-4" />{user?.fullName}</span>
          <AccountBalance />
        </div>
      </div>
    </>
  );
};

export default HomeHeader;
