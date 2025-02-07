import TabLayout from "@/components/TabLayout";
import React from "react";

const LotteryLayout = ({ children }: { children: React.ReactNode }) => {
  return <TabLayout>{children}</TabLayout>;
};

export default LotteryLayout;
