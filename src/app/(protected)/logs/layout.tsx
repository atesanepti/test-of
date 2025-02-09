import React from "react";

import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Logs | CasinoCity24",
  description:
    "View your transaction and game history. Keep track of your wins, losses, and deposits at Bangladesh’s leading casino and betting site.",
};

const LogLayout = ({ children }: { children: React.ReactNode }) => {
  return <div>{children}</div>;
};

export default LogLayout;
