import { Suspense } from "react";
import React from "react";
import HomeHeader from "@/components/headers/HomeHeader";
import Stictics from "@/components/dashboard/Stictics";
import SummaryStatistics from "@/components/dashboard/SummaryStatistics";
import Chart from "@/components/dashboard/Chart";
import DataLoader from "@/components/DataLoade";

const Dashboard = () => {
  const request = fetch(
    `${process.env.NEXT_PUBLIC_APP}/api/admin/statistics`
  ).then((res) => res.json());

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
