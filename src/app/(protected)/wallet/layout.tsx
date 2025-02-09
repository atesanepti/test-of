import TabLayout from "@/components/TabLayout";
import WalletHeader from "@/components/wallet/WalletHeader";
import { Metadata } from "next";
import React from "react";
export const metadata: Metadata = {
  title: "Wallet | CasinoCity24 ",
  description:
    "Manage your funds with ease on Bangladesh’s top casino and betting site. Deposit, withdraw, and track your transactions securely.",
  icons: "/assets/favicon.png",
};
const WalletLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="forg-bg  overflow-x-hidden overflow-y-hidden max-h-s">
      <WalletHeader />

      <TabLayout>{children}</TabLayout>
    </div>
  );
};

export default WalletLayout;
