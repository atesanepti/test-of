import { ChartNoAxesColumn, CircleX, Power } from "lucide-react";
import React from "react";

interface UserStatisticsProps {
  statistics: {
    totalUser: number;
    activeUsers: number;
    bannedUsers: number;
  };
}

const UserStatistics = ({ statistics }: UserStatisticsProps) => {
  return (
    <div className="flex gap-2 items-center justify-between">
      <div className="bg-primary-foreground flex-1 p-2 rounded-md shadow-sm flex items-center gap-2">
        <div className="flex items-center justify-center p-2 rounded-md text-blue-600/50 ">
          <ChartNoAxesColumn className="w-4 h-4 text-blue-600" />
        </div>
        <div>
          <span className="text-muted-foreground text-sm">Total Users</span>
          <span className="text-lg text-white font-semibold block">
            {statistics.totalUser}
          </span>
        </div>
      </div>

      <div className="bg-primary-foreground flex-1 p-2 rounded-md shadow-sm flex items-center gap-2">
        <div className="flex items-center justify-center p-2 rounded-md text-emerald-500/50 ">
          <Power className="w-4 h-4 text-emerald-500" />
        </div>
        <div>
          <span className="text-muted-foreground text-sm">Active Users</span>
          <span className="text-lg text-white font-semibold block">
            {statistics.activeUsers}
          </span>
        </div>
      </div>

      <div className="bg-primary-foreground flex-1 p-2 rounded-md shadow-sm flex items-center gap-2">
        <div className="flex items-center justify-center p-2 rounded-md text-destructive/50 ">
          <CircleX className="w-4 h-4 text-destructive" />
        </div>
        <div>
          <span className="text-muted-foreground text-sm">Banned Users</span>
          <span className="text-lg text-white font-semibold block">
            {statistics.bannedUsers}
          </span>
        </div>
      </div>
    </div>
  );
};

export default UserStatistics;
