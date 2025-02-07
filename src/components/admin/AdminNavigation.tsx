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
import { getCurrentUser } from "@/lib/getCurrentUser";
interface AdminNavigationProps {
  children: React.ReactNode;
}

const AdminNavigation = async ({ children }: AdminNavigationProps) => {
  const user = await getCurrentUser();

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
              <span className="px-2 py-1 bg-[#8B5DFF] text-white text-sm rounded-sm rounded-s-sm font-light">
                AGENT
              </span>
              <span className="px-2 py-1 border border-[#9ABF80] text-[#9ABF80] text-sm rounded-e-sm font-ligh">
                Navigation
              </span>
            </span>
          </SheetTitle>
        )}
        <Accordion type="single" collapsible>
          <AccordionItem value="item-1">
            <AccordionTrigger>Payments</AccordionTrigger>
            <AccordionContent>
              <nav className="flex flex-col gap-2">
                <Link
                  href="/admin/deposits"
                  className="text-xs text-muted-foreground hover:text-white"
                >
                  Deposits
                </Link>
                <Link
                  href="/admin/withdraw"
                  className="text-xs text-muted-foreground hover:text-white"
                >
                  Withdraw
                </Link>
                <Link
                  href="/admin/gateway"
                  className="text-xs text-muted-foreground hover:text-white"
                >
                  Gateway
                </Link>
              </nav>
            </AccordionContent>
          </AccordionItem>
        </Accordion>

        <Link
          href="/admin/users"
          className="text-sm font-medium text-white hover:text-white/90 block"
        >
          Users
        </Link>

        <Link
          href="/admin/site-setting"
          className="text-sm font-medium text-white hover:text-white/90 block"
        >
          Site Setting
        </Link>

        <Link
          href="/admin/lottery"
          className="text-sm font-medium text-white hover:text-white/90 block"
        >
          Lottery
        </Link>
      </SheetContent>
    </Sheet>
  );
};

export default AdminNavigation;
