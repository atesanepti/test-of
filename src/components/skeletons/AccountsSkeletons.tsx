import { Skeleton } from "@/components/ui/skeleton";
import React from "react";

const AccountsSkeletons = () => {
  return (
    <div className="flex items-center gap-3 my-3">
      <Skeleton className="flex-1 h-[60px] rounded-lg ">
        <Skeleton className="w-6 h-6 rounded-sm ml-4 mt-2 " />
        <Skeleton className="w-10 h-4 rounded-sm mt-2 ml-4 " />
      </Skeleton>
      <Skeleton className="flex-1 h-[60px] rounded-lg ">
        <Skeleton className="w-6 h-6 rounded-sm ml-4 mt-2" />
        <Skeleton className="w-10 h-4 rounded-sm mt-2 ml-4 " />
      </Skeleton>
    </div>
  );
};

export default AccountsSkeletons;
