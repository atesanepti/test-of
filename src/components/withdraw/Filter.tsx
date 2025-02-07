"use client";
import React from "react";
import { Button } from "@/components/ui/button";
import { FilterIcon } from "lucide-react";
import { useWithdrawReqFilter } from "@/lib/store";
import { cn } from "@/lib/utils";
import { PaymentMethod, WithdrawsStatus } from "@prisma/client";
import { DateRange } from "@/types/enum";

export const FileterButton = () => {
  const setToggleVisible = useWithdrawReqFilter(
    (state) => state.setToggleVisible
  );
  return (
    <Button size={"sm"} onClick={setToggleVisible}>
      <FilterIcon className="w-3 h-3 " />
    </Button>
  );
};

const Filter = () => {
  const { isVisible, date, status, method, setFilter, clearState } =
    useWithdrawReqFilter((state) => state);

  if (!isVisible) return null;

  const handleStatusFiltering = (status: WithdrawsStatus | string) => {
    setFilter({ status });
  };

  const handleMethodFiltering = (method: PaymentMethod | string) => {
    setFilter({ method });
  };
  const handleDateFiltering = (date: DateRange) => {
    setFilter({ date });
  };

  return (
    <div className="flex items-start justify-between px-3 py-3 border-b border-b-border relative">
      <div>
        <h4
          className={
            "text-white text-xs font-medium border-b border-b-border py-2"
          }
        >
          Filter By Date
        </h4>
        <ul>
          <li
            onClick={() => handleDateFiltering(DateRange.TODAY)}
            className={cn(
              "text-muted-foreground hover:text-white mt-1 text-[10px] cursor-pointer",
              `${
                date === DateRange.TODAY &&
                "text-white hover:text-muted-foreground"
              }`
            )}
          >
            Today
          </li>
          <li
            onClick={() => handleDateFiltering(DateRange.YEASTERDAY)}
            className={cn(
              "text-muted-foreground hover:text-white mt-1 text-[10px] cursor-pointer",
              `${
                date === DateRange.YEASTERDAY &&
                "text-white hover:text-muted-foreground"
              }`
            )}
          >
            Yaster Day
          </li>
          <li
            onClick={() => handleDateFiltering(DateRange.LAST7DAYS)}
            className={cn(
              "text-muted-foreground hover:text-white mt-1 text-[10px] cursor-pointer",
              `${
                date === DateRange.LAST7DAYS &&
                "text-white hover:text-muted-foreground"
              }`
            )}
          >
            Last 7 Days
          </li>
          <li
            onClick={() => handleDateFiltering(DateRange.LAST30DAYS)}
            className={cn(
              "text-muted-foreground hover:text-white mt-1 text-[10px] cursor-pointer",
              `${
                date === DateRange.LAST30DAYS &&
                "text-white hover:text-muted-foreground"
              }`
            )}
          >
            Last 30 Days
          </li>
        </ul>
      </div>

      <div>
        <h4 className="text-white text-xs font-medium border-b border-b-border py-2">
          Filter By Status
        </h4>
        <ul>
          <li
            onClick={() => handleStatusFiltering("")}
            className={cn(
              "text-muted-foreground hover:text-white mt-1 text-[10px] cursor-pointer",
              `${status === "" && "text-white hover:text-muted-foreground"}`
            )}
          >
            All
          </li>
          <li
            onClick={() => handleStatusFiltering(WithdrawsStatus.ACCEPTED)}
            className={cn(
              "text-muted-foreground hover:text-white mt-1 text-[10px] cursor-pointer",
              `${
                status === WithdrawsStatus.ACCEPTED &&
                "text-white hover:text-muted-foreground"
              }`
            )}
          >
            Approved
          </li>
          <li
            onClick={() => handleStatusFiltering(WithdrawsStatus.REJECTED)}
            className={cn(
              "text-muted-foreground hover:text-white mt-1 text-[10px] cursor-pointer",
              `${
                status === WithdrawsStatus.REJECTED &&
                "text-white hover:text-muted-foreground"
              }`
            )}
          >
            Rejected
          </li>
        </ul>
      </div>

      <div>
        <h4 className="text-white text-xs font-medium border-b border-b-border py-2">
          Filter By Payment Method
        </h4>
        <ul>
          <li
            onClick={() => handleMethodFiltering(PaymentMethod.BKASH)}
            className={cn(
              "text-muted-foreground hover:text-white mt-1 text-[10px] cursor-pointer",
              `${
                method === PaymentMethod.BKASH &&
                "text-white hover:text-muted-foreground"
              }`
            )}
          >
            Bkash
          </li>
          <li
            onClick={() => handleMethodFiltering(PaymentMethod.NAGAD)}
            className={cn(
              "text-muted-foreground hover:text-white mt-1 text-[10px] cursor-pointer",
              `${
                method === PaymentMethod.NAGAD &&
                "text-white hover:text-muted-foreground"
              }`
            )}
          >
            Nagad
          </li>
        </ul>
      </div>

      <button
        className="text-muted-foreground hover:text-white border border-border px-2 py-1 cursor-pointer text-xs  absolute bottom-5 right-5"
        onClick={() => clearState()}
      >
        Clear
      </button>
    </div>
  );
};

export default Filter;
