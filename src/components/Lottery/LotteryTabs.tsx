"use client";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import React from "react";
import FireInstructions from "./FireInstructions";
import TicketList from "./TicketList";
import { useTranslation } from "@/lib/store";

const LotteryTabs = () => {
  const lan = useTranslation((state) => state.lan);
  return (
    <Tabs defaultValue="ticket" className="w-full md:w-4/5  mx-auto mt-10">
      <TabsList>
        <TabsTrigger value="ticket">
          {lan == "BN" ? "আপনার টিকেটসমূহ" : "Your tickets"}
        </TabsTrigger>
        <TabsTrigger value="instruction">
          {lan == "BN" ? "নির্দেশনা" : "Instruction"}
        </TabsTrigger>
      </TabsList>
      <TabsContent value="ticket">
        <TicketList />
      </TabsContent>
      <TabsContent value="instruction">
        <FireInstructions />
      </TabsContent>
    </Tabs>
  );
};

export default LotteryTabs;
