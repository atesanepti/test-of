import PageHeader from "@/components/headers/PageHeader";
import Historis from "@/components/log/Historis";
import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "Logs | CasinoCity24",
  description:
    "View your transaction and game history. Keep track of your wins, losses, and deposits at Bangladesh’s leading casino and betting site.",
};

const LogPage = () => {
  return (
    <div className="py-4 px-2">
      <div className="container">
        <PageHeader title="Logs" />
        <Historis />
      </div>
    </div>
  );
};

export default LogPage;
