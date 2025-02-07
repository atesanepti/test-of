"use client";
import { useFetchAllWithdrawQuery } from "@/lib/features/api/withdrawApiSlice";
import { useWithdrawReqFilter } from "@/lib/store";
import React from "react";
import WithdrawReq from "./WithdrawReq";
import Pagination from "../Pagination";
import { Skeleton } from "../ui/skeleton";

const WithdrawList = () => {
  const { date, status, method, page, search, setPage } = useWithdrawReqFilter(
    (state) => state
  );

  const { data, isLoading } = useFetchAllWithdrawQuery({
    page,
    search,
    date,
    status,
    method,
  });

  const payload = data?.payload;

  const handlePageChange = (page: number) => {
    setPage(page);
  };

  return (
    <div>
      {payload && (
        <div>
          {payload.withdraws.map((d) => (
            <WithdrawReq key={d.id} deposit={d} />
          ))}
        </div>
      )}

      {payload?.withdraws?.length == 0 && (
        <span className="text-muted text-xs">No Withrequest request Found</span>
      )}

      {payload &&
        payload?.withdraws?.length !== 0 &&
        payload.totalFound > 10 && (
          <Pagination
            currentPage={page}
            totalFound={payload.totalFound}
            onPageChange={handlePageChange}
          />
        )}

      {isLoading && (
        <div className="flex flex-col gap-3">
          <Skeleton className="h-12" />
          <Skeleton className="h-12" />
          <Skeleton className="h-12" />
          <Skeleton className="h-12" />
          <Skeleton className="h-12" />
        </div>
      )}
    </div>
  );
};

export default WithdrawList;
