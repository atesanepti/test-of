import { Suspense } from "react";
import React from "react";
import HomeHeader from "@/components/headers/HomeHeader";
import Stictics from "@/components/dashboard/Stictics";
import SummaryStatistics from "@/components/dashboard/SummaryStatistics";
import Chart from "@/components/dashboard/Chart";
import DataLoader from "@/components/DataLoade";
import { Metadata } from "next";
export const metadata: Metadata = {
  title: "Dashboard | CasinoCity24",
  description:
    "Manage users, monitor activities, and oversee transactions easily with the admin dashboard. Stay in control of your Bangladesh casino and betting site.",
};
const Dashboard = () => {
  console.log("process.env.NEXT_PUBLIC_APP", process.env.NEXT_PUBLIC_APP);
  const request = fetch(
    `${process.env.NEXT_PUBLIC_APP}/api/admin/statistics`
  ).then((res) => res.json()).catch(error)=>{
    console.log("Dashboard error")
  }

  return (
    <div>
      <HomeHeader />

      <div className="container py-4 px-2 flex flex-col gap-12">
        <Suspense fallback={<DataLoader />}>
          <Stictics request={request} />
        </Suspense>
        <Suspense fallback={<DataLoader />}>
          <Chart />
        </Suspense>
        <Suspense fallback={<DataLoader />}>
          <SummaryStatistics request={request} />
        </Suspense>
      </div>
    </div>
  );
};

export default Dashboard;
