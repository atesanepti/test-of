"use client";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { format } from "@/lib/currency";
import {
  useFetchLogsQuery,
  useLogSeenMutation,
} from "@/lib/features/api/logApiSlice";
import { cn } from "@/lib/utils";
import { LogType, Prisma } from "@prisma/client";
import { useEffect, useState } from "react";

import moment from "moment";
import { Skeleton } from "../ui/skeleton";
import { useTranslation } from "@/lib/store";

const LogsList = ({ logs }: { logs: Prisma.logGetPayload<object>[] }) => {
  return (
    <div className="flex flex-col gap-2">
      {logs.map((l, i) => (
        <div
          key={i}
          className=" p-2 rounded-sm border border-border bg-primary"
        >
          <div className="flex items-start justify-between">
            <div>
              <h4 className="text-base font-semibold text-white">
                {format(l.amount)}
              </h4>
              <span className="text-[10px] text-muted">{l.title}</span>
            </div>
            <span
              className={cn(
                "px-2 py-1 text-white text-xs capitalize",
                `${l.log_type == "WITHDRAW" ? "bg-[#A855F7]" : "bg-[#3B82F6]"}`
              )}
            >
              {l.log_type}
            </span>
          </div>

          <p className="text-xs text-muted-foreground mt-1">{l.des}</p>
          <span className="text-[10px] text-muted">
            {moment(l.createdAt).calendar()}
          </span>
        </div>
      ))}
    </div>
  );
};

const Historis = () => {
  const [selecedTab, setSelectedTab] = useState<LogType | undefined>(undefined);
  const { data, isLoading, isFetching } = useFetchLogsQuery({
    logType: selecedTab,
  });
  const logs = data?.payload;
  const lan = useTranslation((state) => state.lan);
  const [logSeenApi] = useLogSeenMutation();

  useEffect(() => {
    logSeenApi().unwrap();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="py-4">
      <Tabs defaultValue="All" className="w-full">
        <TabsList>
          <TabsTrigger onClick={() => setSelectedTab(undefined)} value="All">
            {lan == "BN" ? "সব" : "All"}
          </TabsTrigger>
          <TabsTrigger
            onClick={() => setSelectedTab("DEPOSIT")}
            value="Deposit"
          >
            {lan == "BN" ? "ডিপোজিট" : "Deposit"}
          </TabsTrigger>
          <TabsTrigger
            onClick={() => setSelectedTab("WITHDRAW")}
            value="Withdraw"
          >
            {lan == "BN" ? "উত্তোলন" : "Withdraw"}
          </TabsTrigger>
        </TabsList>
        <TabsContent value="All">
          {logs && !isLoading && !isFetching && <LogsList logs={logs} />}
          {logs && logs.length === 0 && !isFetching && (
            <span className="text-sm text-muted-foreground block text-center my-5">
              {lan == "BN" ? "তথ্য আনার কিছু নেই" : "Nothink to Fetch"}
            </span>
          )}

          {(isLoading || isFetching) && (
            <div className="flex flex-col gap-3">
              <Skeleton className="h-12" />
              <Skeleton className="h-12" />
              <Skeleton className="h-12" />
              <Skeleton className="h-12" />
              <Skeleton className="h-12" />
              <Skeleton className="h-12" />
            </div>
          )}
        </TabsContent>
        <TabsContent value="Deposit">
          {logs && !isLoading && !isFetching && <LogsList logs={logs} />}
          {logs && logs.length === 0 && !isFetching && (
            <span className="text-sm text-muted-foreground block text-center my-5">
              {lan == "BN" ? "তথ্য আনার কিছু নেই" : "Nothink to Fetch"}
            </span>
          )}

          {(isLoading || isFetching) && (
            <div className="flex flex-col gap-3">
              <Skeleton className="h-12" />
              <Skeleton className="h-12" />
              <Skeleton className="h-12" />
              <Skeleton className="h-12" />
              <Skeleton className="h-12" />
              <Skeleton className="h-12" />
            </div>
          )}
        </TabsContent>
        <TabsContent value="Withdraw">
          {logs && !isLoading && !isFetching && <LogsList logs={logs} />}
          {logs && logs.length === 0 && !isFetching && (
            <span className="text-sm text-muted-foreground block text-center my-5">
              {lan == "BN" ? "তথ্য আনার কিছু নেই" : "Nothink to Fetch"}
            </span>
          )}

          {(isLoading || isFetching) && (
            <div className="flex flex-col gap-3">
              <Skeleton className="h-12" />
              <Skeleton className="h-12" />
              <Skeleton className="h-12" />
              <Skeleton className="h-12" />
              <Skeleton className="h-12" />
              <Skeleton className="h-12" />
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Historis;
