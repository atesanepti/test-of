"use client";
import { useFetchAllDepositsQuery } from "@/lib/features/api/depositApiSlice";
import { useDepositsReqFilter } from "@/lib/store";
import React from "react";
import DepositReq from "./DepositReq";
import Pagination from "../Pagination";
import { Skeleton } from "../ui/skeleton";

const DepositsList = () => {
  const { date, status, method, page, search, setPage } = useDepositsReqFilter(
    (state) => state
  );

  const { data, isLoading ,isFetching} = useFetchAllDepositsQuery({
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
      {payload && 
        !isLoading &&
        !isFetching &&(
        <div>
          {payload.deposits.map((d) => (
            <DepositReq key={d.id} deposit={d} />
          ))}
        </div>
      )}

      {payload?.deposits?.length == 0 &&(
          <span className="text-muted text-xs">No Deposit request Found</span>
        )}

      {payload &&
        payload?.deposits?.length !== 0 &&
        payload.totalFound > 10 && (
          <Pagination
            currentPage={page}
            totalFound={payload.totalFound}
            onPageChange={handlePageChange}
          />
        )}

      {(isLoading ||
        isFetching) && (
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

export default DepositsList;
