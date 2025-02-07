import PageHeader from "@/components/headers/PageHeader";
import Historis from "@/components/log/Historis";
import React from "react";

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
