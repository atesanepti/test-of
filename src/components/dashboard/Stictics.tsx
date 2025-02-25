import { format } from "@/lib/currency";
import { DashboardStictis } from "@/types/interface";
import React from "react";

const Stictics = ({ request }: { request: DashboardStictis }) => {
  const {
    totalUsers,
    totalDespositsAmount,
    currentDespositAmount,
    totalWithdrawAmount,
  } = request.payload;

  return (
    <div className="grid grid-cols-2 gap-3">
      <div className="shadow-md bg-primary-foreground p-3 rounded-lg">
        <span className="text-xs text-muted-foreground">Total Users</span>
        <h4 className="text-sm font-semibold text-white mt-1">{totalUsers}</h4>
      </div>
      <div className="shadow-md bg-primary-foreground p-3 rounded-lg">
        <span className="text-xs text-muted-foreground">Total Deposits</span>
        <h4 className="text-sm font-semibold text-white mt-1">
          {format(totalDespositsAmount)}
        </h4>
      </div>

      <div className="shadow-md bg-primary-foreground p-3 rounded-lg">
        <span className="text-xs text-muted-foreground">Current Deposits</span>
        <h4 className="text-sm font-semibold text-white mt-1">
          {format(currentDespositAmount)}
        </h4>
      </div>

      <div className="shadow-md bg-primary-foreground p-3 rounded-lg">
        <span className="text-xs text-muted-foreground">Total Withdrawals</span>
        <h4 className="text-sm font-semibold text-white mt-1">
          {format(totalWithdrawAmount)}
        </h4>
      </div>
    </div>
  );
};

export default Stictics;
