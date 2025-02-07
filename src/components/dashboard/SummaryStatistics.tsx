import { format } from "@/lib/currency";
import { DashboardStictis } from "@/types/interface";
import React, { use } from "react";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const SummaryStatistics = ({ request }: { request: any }) => {
  const data: DashboardStictis = use(request);

  const { netRevenue, avgDespositsAmount, avgWithdrawAmount } = data.payload;

  return (
    <div className="bg-primary-foreground p-3 rounded-lg">
      <h4 className="text-white text-sm font-semibold mb-2">
        Summery Statistics
      </h4>
      <ul className="flex flex-col gap-2">
        <li className="flex items-center justify-between">
          <span className="text-sm text-muted-foreground">Net Revenue</span>
          <span className="text-sm text-emerald-600">{format(netRevenue)}</span>
        </li>
        <li className="flex items-center justify-between">
          <span className="text-sm text-muted-foreground">Avg Deposit</span>
          <span className="text-sm text-white">
            {format(avgDespositsAmount)}
          </span>
        </li>
        <li className="flex items-center justify-between">
          <span className="text-sm text-muted-foreground">Avg Withdrawal</span>
          <span className="text-sm text-white">
            {format(avgWithdrawAmount)}
          </span>
        </li>
      </ul>
    </div>
  );
};

export default SummaryStatistics;
