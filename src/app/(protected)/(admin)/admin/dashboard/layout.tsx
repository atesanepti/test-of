import React from "react";
import { Metadata } from "next";
import HomeHeader from "@/components/headers/HomeHeader";

export const metadata: Metadata = {
  title: "Dashboard | CasinoCity24",
  description:
    "Manage users, monitor activities, and oversee transactions easily with the admin dashboard. Stay in control of your Bangladesh casino and betting site.",
};
const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div>
      <HomeHeader />
      {children}
    </div>
  );
};

export default DashboardLayout;
