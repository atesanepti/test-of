"use client";
import React from "react";
import {
  Sheet,
  SheetContent,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

import Link from "next/link";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  Clover,
  CreditCard,
  LayoutDashboard,
  Settings,
  Users,
  AppWindowMac,
} from "lucide-react";
import { UserRole } from "@prisma/client";
import { useCurrentUser } from "@/hook/useGetUser";
interface AdminNavigationProps {
  children: React.ReactNode;
}

const AdminNavigation = ({ children }: AdminNavigationProps) => {
  const user = useCurrentUser();

  const role = user && user.role;

  return (
    <Sheet>
      <SheetTrigger asChild>{children}</SheetTrigger>
      <SheetContent side={"left"}>
        {role == "ADMIN" && (
          <SheetTitle className="text-white text-sm flex items-center" asChild>
            <span>
              <span className="px-2 py-1 bg-[#8B5DFF] border border-[#8B5DFF] text-white text-sm rounded-s-sm font-light">
                Admin
              </span>
              <span className="px-2 py-1 border border-[#8B5DFF] text-[#8B5DFF] text-sm rounded-e-sm font-light">
                Navigation
              </span>
            </span>
          </SheetTitle>
        )}
        {role == "AGENT" && (
          <SheetTitle className="text-white text-sm flex items-center" asChild>
            <span>
              <span className="px-2 py-1 bg-[#5B913B] text-white text-sm  rounded-s-sm font-light">
                AGENT
              </span>
              <span className="px-2 py-1 border border-[#5B913B] text-[#5B913B] text-sm rounded-e-sm font-ligh">
                Navigation
              </span>
            </span>
          </SheetTitle>
        )}

        <Link
          href="/admin"
          className="text-sm font-medium text-white hover:text-white/90  mb-3 flex items-center gap-1"
        >
          <AppWindowMac className="w-4 h-5" />
          App
        </Link>
        <Link
          href="/admin/dashboard"
          className="text-sm font-medium text-white hover:text-white/90  mb-3 flex items-center gap-1"
        >
          <LayoutDashboard className="w-4 h-4" />
          Dashboard
        </Link>
        <Accordion type="single" collapsible>
          <AccordionItem value="item-1">
            <AccordionTrigger>
              <span className="flex items-center gap-1">
                <CreditCard className="w-4 h-4" />
                Payments
              </span>
            </AccordionTrigger>
            <AccordionContent>
              <nav className="flex flex-col gap-2">
                <Link
                  href="/admin/deposits"
                  className="text-xs text-muted-foreground hover:text-white"
                >
                  Deposits
                </Link>
                <Link
                  href="/admin/withdraws"
                  className="text-xs text-muted-foreground hover:text-white"
                >
                  Withdraw
                </Link>
                {user?.role == UserRole.ADMIN && (
                  <Link
                    href="/admin/gateway"
                    className="text-xs text-muted-foreground hover:text-white"
                  >
                    Gateway
                  </Link>
                )}
              </nav>
            </AccordionContent>
          </AccordionItem>
        </Accordion>

        {user?.role == UserRole.ADMIN && (
          <Link
            href="/admin/users"
            className="text-sm font-medium text-white hover:text-white/90 mb-3 flex items-center gap-1"
          >
            <Users className="w-4 h-4" />
            Users
          </Link>
        )}

        {user?.role == UserRole.ADMIN && (
          <Link
            href="/admin/site-setting"
            className="text-sm font-medium text-white hover:text-white/90  mb-3 flex items-center gap-1"
          >
            <Settings className="w-4 h-4" />
            Site Setting
          </Link>
        )}

        <Link
          href="/admin/lottery"
          className="text-sm font-medium text-white hover:text-white/90  mb-3 flex items-center gap-1"
        >
          <Clover className="w-4 h-4" />
          Lottery
        </Link>
      </SheetContent>
    </Sheet>
  );
};

export default AdminNavigation;
