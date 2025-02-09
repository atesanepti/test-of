import { useUpdateDespositStatusMutation } from "@/lib/features/api/depositApiSlice";
import { cn } from "@/lib/utils";
import { FetchQueryError } from "@/types/interface";
import { DepositsStatus, PaymentMethod, Prisma } from "@prisma/client";
import { Copy } from "lucide-react";
import React from "react";
import toast from "react-hot-toast";
import moment from "moment";
import { format } from "@/lib/currency";

const DepositReq = ({
  deposit,
}: {
  deposit: Prisma.depositsGetPayload<{
    include: { gateway: true; user: true };
  }>;
}) => {
  const [updateApi, { isLoading }] = useUpdateDespositStatusMutation();

  const handleUpdateDeposit = async (status: DepositsStatus, id: string) => {
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

  const handleCopy = (id: string) => {
    navigator.clipboard.writeText(id);
  };

  return (
    <div className="flex items-center justify-between p-1 border-b border-b-border hover:bg-primary/15 py-2">
      <div className="flex-1">
        <span className="text-xs text-white mb-1 relative">
          {deposit.walletNumber}
          <span
            className={cn(
              "absolute text-[7px] top-0 -right-10 px-1 rounded-full border",
              `${
                deposit.gateway?.method === PaymentMethod.BKASH
                  ? "text-[#DF146E] border-[#df146e]"
                  : "text-[#F7921C]   border-[#f39b36]"
              }`
            )}
          >
            {deposit.gateway?.method}
          </span>

          <span className="text-[9px] text-muted absolute  top-0 -right-36">
            {moment(deposit.createdAt).subtract(0, "days").calendar()}
          </span>
        </span>

        <span className="text-muted text-[10px] flex items-center gap-1">
          {deposit.user.email}
        </span>

        {deposit.status === DepositsStatus.REJECTED && (
          <span className="px-2 py-1 bg-destructive/15 text-destructive rounded-full text-[10px]">
            Rejected
          </span>
        )}

        {deposit.status === DepositsStatus.ACCEPTED && (
          <span className="px-2 py-1 bg-emerald-600/15 text-emerald-600 rounded-full text-[10px]">
            Approved
          </span>
        )}
        {deposit.status === DepositsStatus.PENDING && (
          <div className="flex items-center gap-2 mt-2">
            <button
              disabled={isLoading}
              onClick={() =>
                handleUpdateDeposit(DepositsStatus.ACCEPTED, deposit.id)
              }
              className="bg-emerald-600 hover:bg-emerald-600/90 text-white rounded-md text-[10px] px-2 py-1 cursor-pointer disabled:pointer-events-none disabled:opacity-50"
            >
              Approve
            </button>

            <button
              disabled={isLoading}
              onClick={() =>
                handleUpdateDeposit(DepositsStatus.REJECTED, deposit.id)
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
          {format(deposit.amount)}
        </span>
        <span className="text-muted text-[10px] flex items-center gap-1">
          {deposit.transaction_id}{" "}
          <button onClick={() => handleCopy(deposit.transaction_id)}>
            <Copy className="w-2 h-2" />
          </button>
        </span>
      </div>
    </div>
  );
};

export default DepositReq;
