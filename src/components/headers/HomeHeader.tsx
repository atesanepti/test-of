import { getCurrentUser } from "@/lib/getCurrentUser";
import { UserRole } from "@prisma/client";
import React from "react";

import AdminNavigation from "../admin/AdminNavigation";
import { Menu } from "lucide-react";
import AccountBalance from "../AccountBalance";
import Logo from "../Logo";
import Link from "next/link";
import { Button } from "../ui/button";

const Header = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="bg-primary sticky top-0 z-[10] left-0 w-full mx-auto md:w-[550px] rounded-b-none md:rounded-b-lg px-2 py-5 border-b border-b-border flex items-center justify-between">
      {children}
    </div>
  );
};

const HomeHeader = async () => {
  const user = await getCurrentUser();
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

const HomeHeaderUser = async () => {
  const user = await getCurrentUser();
  return (
    <>
      <Logo />
      <div className="flex items-center gap-3">
        {!user && (
          <div className="flex items-center gap-2">
            <Link href="/signup">
              <Button size={"sm"}>Signup</Button>
            </Link>
            <Link href="/signin">
              <Button size={"sm"} variant={"secondary"}>
                Signin
              </Button>
            </Link>
          </div>
        )}
        <AccountBalance />
      </div>
    </>
  );
};

export default HomeHeader;
