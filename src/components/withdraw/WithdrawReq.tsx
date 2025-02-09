import { useUpdateWithdrawStatusMutation } from "@/lib/features/api/withdrawApiSlice";
import { cn } from "@/lib/utils";
import { FetchQueryError } from "@/types/interface";
import {
  DepositsStatus,
  PaymentMethod,
  Prisma,
  WithdrawsStatus,
} from "@prisma/client";
import React from "react";
import toast from "react-hot-toast";
import moment from "moment";
import { format } from "@/lib/currency";

const WithdrawReq = ({
  withdraw,
}: {
  withdraw: Prisma.withdrawsGetPayload<{
    include: { gateway: true; user: true };
  }>;
}) => {
  const [updateApi, { isLoading }] = useUpdateWithdrawStatusMutation();

  const handleUpdateDeposit = async (status: WithdrawsStatus, id: string) => {
    updateApi({ id, payload: { status } })
      .unwrap()
      .then((res) => {
        if (res.success) {
          toast.success(res.message);
        }
      })
      .catch((error: FetchQueryError) => {
        if (error.data) {
          toast.error(error.data.message);
        } else {
          toast.error("Something went wrong! Try aging");
        }
      });
  };

  return (
    <div className="flex items-center justify-between p-1 border-b border-b-border hover:bg-primary/15 py-2">
      <div className="flex-1">
        <span className="text-xs text-white mb-1 relative">
          {withdraw.pay_to}
          <span
            className={cn(
              "absolute text-[7px] top-0 -right-10 px-1 rounded-full border",
              `${
                withdraw.gateway?.method === PaymentMethod.BKASH
                  ? "text-[#DF146E] border-[#df146e]"
                  : "text-[#F7921C]   border-[#f39b36]"
              }`
            )}
          >
            {withdraw.gateway?.method}
          </span>

          <span className="text-[9px] text-muted absolute  top-0 -right-36">
            {moment(withdraw.createdAt).subtract(0, "days").calendar()}
          </span>
        </span>

        <span className="text-muted text-[10px] flex items-center gap-1">
          {withdraw.user.email}
        </span>

        {withdraw.status === DepositsStatus.REJECTED && (
          <span className="px-2 py-1 bg-destructive/15 text-destructive rounded-full text-[10px]">
            Rejected
          </span>
        )}

        {withdraw.status === DepositsStatus.ACCEPTED && (
          <span className="px-2 py-1 bg-emerald-600/15 text-emerald-600 rounded-full text-[10px]">
            Approved
          </span>
        )}
        {withdraw.status === DepositsStatus.PENDING && (
          <div className="flex items-center gap-2 mt-2">
            <button
              disabled={isLoading}
              onClick={() =>
                handleUpdateDeposit(DepositsStatus.ACCEPTED, withdraw.id)
              }
              className="bg-emerald-600 hover:bg-emerald-600/90 text-white rounded-md text-[10px] px-2 py-1 cursor-pointer disabled:pointer-events-none disabled:opacity-50"
            >
              Approve
            </button>

            <button
              disabled={isLoading}
              onClick={() =>
                handleUpdateDeposit(DepositsStatus.REJECTED, withdraw.id)
              }
              className="bg-destructive hover:bg-destructive/90 text-white rounded-md text-[10px] px-2 py-1 cursor-pointer disabled:pointer-events-none disabled:opacity-50"
            >
              Rejected
            </button>
          </div>
        )}
      </div>

      <div className="flex flex-col">
        <span className="text-sm font-semibold text-white">
          {format(withdraw.amount)}
        </span>
      </div>
    </div>
  );
};

export default WithdrawReq;
