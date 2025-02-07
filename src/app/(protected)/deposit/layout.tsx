import { Metadata } from "next";
import React from "react";
export const metadata: Metadata = {
  title: "Deposit | CasinoCity24",
  description:
    "Deposit funds easily and securely to your account. Start playing and winning real money at Bangladesh’s top online casino and betting site.",
};

const DepositLayout = ({ children }: { children: React.ReactNode }) => {
  return <div>{children}</div>;
};

export default DepositLayout;
