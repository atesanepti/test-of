import { Metadata } from "next";
import React from "react";


export const metadata: Metadata = {
  title: "Withdraw | CasinoCity24",
  description:
    "Withdraw your winnings quickly and securely. Enjoy fast payouts at Bangladesh’s top online casino and betting site.",
};


const WithdrawLayout = ({ children }: { children: React.ReactNode }) => {
  return <div>{children}</div>;
};

export default WithdrawLayout;
