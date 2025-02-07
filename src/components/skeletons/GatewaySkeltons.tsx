import { Skeleton } from "@/components/ui/skeleton";
import React from "react";

const GatewaySkeleton = () => {
  return (
    <>
      <Skeleton className="flex-1 h-[70px] rounded-lg bg-primary-foreground ">
        <Skeleton className="w-6 h-6 rounded-sm ml-4 mt-2  bg-secondary-foreground" />
        <Skeleton className="w-10 h-4 rounded-sm mt-2 ml-4  bg-secondary-foreground" />
      </Skeleton>
      <Skeleton className="flex-1 h-[70px] rounded-lg  bg-primary-foreground">
        <Skeleton className="w-6 h-6 rounded-sm ml-4 mt-2 bg-secondary-foreground" />
        <Skeleton className="w-10 h-4 rounded-sm mt-2 ml-4 bg-secondary-foreground" />
      </Skeleton>
      <Skeleton className="flex-1 h-[70px] rounded-lg  bg-primary-foreground">
        <Skeleton className="w-6 h-6 rounded-sm ml-4 mt-2 bg-secondary-foreground" />
        <Skeleton className="w-10 h-4 rounded-sm mt-2 ml-4 bg-secondary-foreground " />
      </Skeleton>
    </>
  );
};

export default GatewaySkeleton;
