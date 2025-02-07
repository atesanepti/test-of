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
  const { data, isLoading } = useFetchLogsQuery({ logType: selecedTab });
  const logs = data?.payload;

  const [logSeenApi] = useLogSeenMutation();
  console.log({ logs });

  useEffect(() => {
    logSeenApi().unwrap();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="py-4">
      <Tabs defaultValue="All" className="w-full">
        <TabsList>
          <TabsTrigger onClick={() => setSelectedTab(undefined)} value="All">
            All
          </TabsTrigger>
          <TabsTrigger
            onClick={() => setSelectedTab("DEPOSIT")}
            value="Deposit"
          >
            Deposit
          </TabsTrigger>
          <TabsTrigger
            onClick={() => setSelectedTab("WITHDRAW")}
            value="Withdraw"
          >
            Withdraw
          </TabsTrigger>
        </TabsList>
        <TabsContent value="All">
          {logs && <LogsList logs={logs} />}
          {logs && logs.length === 0 && (
            <span className="text-sm text-muted-foreground block text-center my-5">
              Nothink to Fetch
            </span>
          )}

          {isLoading && (
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
          {logs && <LogsList logs={logs} />}
          {logs && logs.length === 0 && (
            <span className="text-sm text-muted-foreground block text-center my-5">
              Nothink to Fetch
            </span>
          )}

          {isLoading && (
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
          {logs && <LogsList logs={logs} />}
          {logs && logs.length === 0 && (
            <span className="text-sm text-muted-foreground block text-center my-5">
              Nothink to Fetch
            </span>
          )}

          {isLoading && (
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
