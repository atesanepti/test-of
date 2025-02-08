"use client";
import React from "react";
import Stictics from "@/components/dashboard/Stictics";
import SummaryStatistics from "@/components/dashboard/SummaryStatistics";
import Chart from "@/components/dashboard/Chart";
import DataLoader from "@/components/DataLoade";
import { useFetchDashboardQuery } from "@/lib/features/api/dashboardApiSlice";

const Dashboard = () => {
  const { data, isLoading } = useFetchDashboardQuery();

  return (
    <div>
      {/* <HomeHeader /> */}

      {data && (
        <div className="container py-4 px-2 flex flex-col gap-12">
          <Stictics request={data} />
          <Chart />
          <SummaryStatistics request={data} />
        </div>
      )}
      {isLoading && <DataLoader />}
    </div>
  );
};

export default Dashboard;
