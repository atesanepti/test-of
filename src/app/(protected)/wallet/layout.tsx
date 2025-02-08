import TabLayout from "@/components/TabLayout";
import React from "react";

const WalletLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="forg-bg  overflow-x-hidden overflow-y-hidden max-h-s">
      <TabLayout>{children}</TabLayout>
    </div>
  );
};

export default WalletLayout;
