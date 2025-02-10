"use client";
import { useFetchLotteryTicketsQuery } from "@/lib/features/api/lotteryApiSlice";
import React, { useEffect } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { useLottery, useTranslation } from "@/lib/store";

import moment from "moment";

const TicketList = () => {
  const setTotalParticipation = useLottery(
    (state) => state.setTotalParticipation
  );
  const { data, isLoading } = useFetchLotteryTicketsQuery();
  const tickets = data?.payload.tickets;

  useEffect(() => {
    if (data) {
      setTotalParticipation(data.payload.totalParticipation);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

  const lan = useTranslation((state) => state.lan);

  return (
    <div>
      {tickets && (
        <>
          {" "}
          <h4 className="text-white text-sm font-semibold mb-2">
            {lan == "BN" ? "আমার টিকিটসমূহ." : "My Tickets"}
          </h4>
          {tickets.map((t, i) => (
            <div
              key={i}
              className="bg-primary border border-border  shadow-md p-2 rounded-md mb-2"
            >
              <div className="flex items-start justify-between gap-5">
                <div className="flex-1">
                  <span className="relative text-xs text-muted-foreground flex-1 block">
                    {lan == "BN" ? "টিকেট আইডি" : "Ticket Id"}
                    <span className="absolute text-[10px] text-muted-foreground top-0 right-36">
                      {moment(t.createdAt).format("MMM Do YY")}
                    </span>
                  </span>
                  <span className="text-xs text-white block ">{t.id}</span>
                </div>
                <div>
                  <span className="text-xs text-muted-foreground block">
                    {lan == "BN" ? "মূল্য" : "Price"}
                  </span>
                  <span className="text-xs text-white block">{t.amount}</span>
                </div>
                <div className="flex-2">
                  <span className="text-xs text-muted-foreground flex-2 block">
                    Status
                  </span>
                  {t.status === "CHECKING" && (
                    <span className="text-xs text-[#493D9E] bg-[#493D9E]/15 px-2 py-1 rounded-md flex-2 block">
                      CHECKING
                    </span>
                  )}

                  {t.status === "UNMATCHED" && (
                    <span className="text-xs text-destructive bg-destructive/15 px-2 py-1 rounded-md flex-2 block">
                      UNMATCHED
                    </span>
                  )}

                  {t.status === "MATCHED" && (
                    <span className="text-xs text-emerald-500 bg-emerald-500/15 px-2 py-1 rounded-md flex-2 block">
                      Won {t.prize}
                    </span>
                  )}
                </div>
              </div>
            </div>
          ))}
          {tickets.length == 0 && (
            <span className="text-sm text-muted-foreground py-7 block text-center">
              {lan == "BN" ? "আপনার কোনো টিকেট নেই" : "You have no tickets"}
            </span>
          )}
        </>
      )}
      {isLoading && (
        <div className="flex flex-col gap-2">
          <Skeleton className="h-8 p-2" />
          <Skeleton className="h-8 p-2" />
        </div>
      )}
    </div>
  );
};

export default TicketList;
