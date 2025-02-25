"use client";
import React from "react";
import { Button } from "../ui/button";
import { useCreateLotteryTicketsMutation } from "@/lib/features/api/lotteryApiSlice";
import toast from "react-hot-toast";
import { FetchQueryError } from "@/types/interface";
import Loader from "../Loader";
import { useLottery, useTranslation } from "@/lib/store";
import { useFetchWalletDataQuery } from "@/lib/features/api/walletApiSlice";

const LotteryAction = () => {
  const [createTicketApi, { isLoading }] = useCreateLotteryTicketsMutation();
  const totalParticipation = useLottery((state) => state.totalParticipation);
  const { data: wallet } = useFetchWalletDataQuery();
  const lan = useTranslation((state) => state.lan);
  const handleCreateTicket = () => {
    if (!wallet || !wallet.payload) {
      return toast.error("Wait for while");
    }
    if (wallet.payload.mainWallet.account < 20) {
      return toast.error("Recharge your wallet");
    }
    createTicketApi()
      .unwrap()
      .then((res) => {
        if (res) {
          toast.success("Ticket Collected");
        }
      })
      .catch((error: FetchQueryError) => {
        if (error.data.message) {
          toast.error(error.data.message);
        } else {
          toast.error("Unknown Error Try agin");
        }
      });
  };

  return (
    <div className="bg-primary border border-border p-4 rounded-lg  shadow-md w-72 mt-8 mx-auto">
      <div className="flex items-center justify-between">
        <h4 className="text-sm text-white font-semibold">
          {lan == "BN" ? "মোট অংশগ্রহণ" : "Total participation"}
        </h4>

        <span className="bg-primary border border-border rounded-lg px-2 py-1 text-xs text-white">
          {totalParticipation}+
        </span>
      </div>

      <Button
        disabled={!wallet}
        onClick={handleCreateTicket}
        size={"sm"}
        className="mt-4"
      >
        {lan == "BN" ? "টিকেট নিন" : "Get Tickey"}
      </Button>

      {isLoading && <Loader />}
    </div>
  );
};

export default LotteryAction;
