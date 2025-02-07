import TabLayout from "@/components/TabLayout";
import React from "react";

const GameLayout = ({ children }: { children: React.ReactNode }) => {
  return <TabLayout>{children}</TabLayout>;
};

export default GameLayout;
