import HomeHeader from "@/components/headers/HomeHeader";
import React from "react";

const GatewayPage = ({ children }: { children: React.ReactNode }) => {
  return (
    <div>
      <HomeHeader />
      {children}
    </div>
  );
};

export default GatewayPage;
