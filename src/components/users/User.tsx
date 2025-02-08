"use client";
import {
  useFetchUserQuery,
  useUserUpdateMutation,
} from "@/lib/features/api/usersApiSlice";
import { useParams } from "next/navigation";
import React, { useEffect } from "react";

import moment from "moment";
import { format } from "@/lib/currency";
import { Button } from "../ui/button";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { UserPaymentPieChart } from "./UserPaymentPieChart";
import { cn } from "@/lib/utils";
import { ClipLoader } from "react-spinners";
import toast from "react-hot-toast";
import { notFound } from "next/navigation";
import DataLoader from "../DataLoade";

const User = () => {
  const { id } = useParams();
  const { data, error, isLoading } = useFetchUserQuery({
    id: Array.isArray(id) ? id[0] : id!,
  });

  console.log({ data });

  const user = data?.payload.user;

  const profitPercentage = (profit: number, deposit: number) => {
    if (profit == 0 && deposit == 0) {
      return 0;
    }
    const percentage = (profit / deposit) * 100;
    return percentage;
  };

  const [userUpdateApi, { isLoading: updateLoading }] = useUserUpdateMutation();

  const handleUserBan = async (value: string) => {
    try {
      await userUpdateApi({
        body: { ban: { status: value == "ban" ? "BAN" : "UNBAN" } },
        id: id!.toString(),
      }).unwrap();
      toast.success(`The user has ${value}`);
    } catch {
      toast.error("Try agin");
    }
  };

  const handleBalanceTransfer = async () => {
    try {
      await userUpdateApi({
        body: { walletTransfer: true },
        id: id!.toString(),
      }).unwrap();
      toast.success("Bonus Transferred");
    } catch {
      toast.error("Try agin");
    }
  };

  // useEffect(() => {
  //   if (!data || error) {
  //     notFound();
  //   }
  // }, [data, error]);

  return (
    <div className="flex flex-col gap-6">
      {data && (
        <>
          <div className="bg-primary-foreground px-4 py-2 rounded-md shadow-sm">
            <div className="flex items-center justify-between">
              <span className="text-sm text-white font-semibold">
                {user?.fullName}
              </span>
              <Select
                onValueChange={handleUserBan}
                value={user?.isBanned ? "ban" : "unban"}
              >
                <SelectTrigger className="w-[150px]">
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="ban">Ban</SelectItem>
                  <SelectItem value="unban">Unban</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <span className="text-xs text-muted-foreground">
                {user?.email}
              </span>
              <br />
              <span className="text-xs text-muted-foreground">
                {user?.phone}
              </span>
              <br />

              <span className="text-xs text-muted-foreground mt-5">
                Member Since : {moment(user?.createdAt).fromNow()}
              </span>
            </div>
          </div>

          <div className="bg-primary-foreground px-4 py-2 rounded-md shadow-sm">
            <h3 className="text-white text-base font-semibold">
              Wallet Information
            </h3>
            <div className="flex items-center justify-between gap-3 mt-3">
              <div className="bg-secondary-foreground p-2 rounded-md flex-1">
                <span className="text-xs text-muted-foreground">
                  Main Account
                </span>
                <br />
                <h4 className="text-sm font-semibold text-white">
                  {format(user!.wallet!.account)}
                </h4>
              </div>
              <div className="bg-secondary-foreground p-2 rounded-md flex-1">
                <span className="text-xs text-muted-foreground">
                  Bonus Account
                </span>
                <br />
                <h4 className="text-sm font-semibold text-white">
                  {format(user!.bonus!.account)}
                </h4>
              </div>
            </div>

            <Button
              size={"sm"}
              className="mt-4"
              onClick={handleBalanceTransfer}
            >
              Transfer Bonus to Main{" "}
            </Button>
          </div>

          <UserPaymentPieChart
            totalDespostisAmount={data?.payload.totalDepositsAmount}
            totalWithdrawAmount={data?.payload.totalWithdrawsAmount}
          />

          <div className="bg-primary-foreground px-4 py-2 rounded-md shadow-sm">
            <h4 className="text-base font-semibold text-white mb-2">
              User Statistics
            </h4>

            <ul className="flex flex-col gap-2">
              <li className="flex items-center justify-between text-sm">
                <span className="font-medium text-white">Current Wallet</span>
                <span className="text-muted-foreground">
                  {user?.wallet?.account}
                </span>
              </li>
              <li className="flex items-center justify-between text-sm">
                <span className="font-medium text-white">Total Deposit</span>
                <span className="text-muted-foreground">
                  {data?.payload.totalDepositsAmount}
                </span>
              </li>
              <li className="flex items-center justify-between text-sm">
                <span className="font-medium text-white">Total Withdraw</span>
                <span className="text-muted-foreground">
                  {data?.payload.totalWithdrawsAmount}
                </span>
              </li>
              <li className="flex items-center justify-between text-sm">
                <span className="font-medium text-white">Profit/Loss</span>
                <span
                  className={cn(
                    "text-muted-foreground",
                    `${
                      data!.payload!.totalDepositsAmount >
                      data!.payload.totalWithdrawsAmount + user!.wallet!.account
                        ? "text-destructive"
                        : "text-emerald-600"
                    }`
                  )}
                >
                  {profitPercentage(
                    data!.payload.totalWithdrawsAmount + user!.wallet!.account,
                    data!.payload!.totalDepositsAmount
                  )}
                </span>
              </li>
            </ul>
          </div>
        </>
      )}
      {isLoading && <DataLoader />}
      {updateLoading && (
        <div className="fixed top-0 left-0 w-full h-screen bg-black/15 flex justify-center items-center">
          <ClipLoader size={20} color="white" />
        </div>
      )}
    </div>
  );
};

export default User;
