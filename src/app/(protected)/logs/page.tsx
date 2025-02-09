"use client";
import PageHeader from "@/components/headers/PageHeader";
import Historis from "@/components/log/Historis";
import { useTranslation } from "@/lib/store";
import React from "react";

const LogPage = () => {
  const lan = useTranslation((state) => state.lan);
  return (
    <div className="py-4 px-2">
      <div className="container">
        <PageHeader title={lan == "BN" ? "লগ" : "Logs"} />
        <Historis />
      </div>
    </div>
  );
};

export default LogPage;
