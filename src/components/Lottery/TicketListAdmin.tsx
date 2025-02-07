"use client";
import { format } from "@/lib/currency";
import {
  useFetchAllLotteryQuery,
  useMakeLotteryResultMutation,
} from "@/lib/features/api/lotteryApiSlice";
import React, { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import Image from "next/image";
import gold from "@/../public/assets/lottery/gold-icon.png";
import platinum from "@/../public/assets/lottery/platinum-icon.png";
import diamond from "@/../public/assets/lottery/diamond-icon.png";
import { Input } from "../ui/input";
import { cn } from "@/lib/utils";
import { Button } from "../ui/button";
import toast from "react-hot-toast";
import { FetchQueryError } from "./../../types/interface";
import Loader from "../Loader";
import { Skeleton } from "../ui/skeleton";

const TicketListAdmin = () => {
  const [error, setError] = useState("");
  const { data, isLoading: dataLoading } = useFetchAllLotteryQuery();
  const tickes = data?.payload?.tickets;
  const totalParticipation = data?.payload.totalParticipation || 0;
  const totalCollection = data?.payload.totalCollection || 0;

  const [makeDrawApi, { isLoading }] = useMakeLotteryResultMutation();

  const [selectedUsers, setSelectedUsers] =
    useState<{ id: string; prize: number }[]>();

  const [prize, setPrize] = useState<{
    gold: number;
    platinum: number;
    diamond: number;
  }>({
    gold: 0,
    platinum: 0,
    diamond: 0,
  });

  const handleSetUserForPrize = (id: string, prizeAmount: number) => {
    if (prize.gold === 0 || prize.platinum == 0 || prize.diamond == 0) {
      setError("Prize Pool Amount");
      return;
    }
    setError("");
    setSelectedUsers((prevState) => [
      ...(prevState?.filter((v) => v.id !== id) || []),
      { id, prize: prizeAmount },
    ]);
  };

  const checkUserIsSelected = (id: string) => {
    const user = selectedUsers?.find((v) => v.id == id);

    return user;
  };

  const handleDraw = () => {
    makeDrawApi(selectedUsers!)
      .unwrap()
      .then((res) => {
        if (res) {
          toast.success("Draw Successfull");
        }
      })
      .catch((error: FetchQueryError) => {
        if (error.data.message) {
          toast.error(error.data.message);
        } else {
          toast.error("Unknow Error Try agin");
        }
      });
  };

  return (
    <div>
      <div className="flex items-center  justify-between gap-2 mb-8">
        <div className="bg-primary flex-1 border border-border p-2 rounded-md shadow-sm">
          <span className="block text-xs text-muted">Totoal Participation</span>
          <span className="block text-sm font-semibold text-white ">
            {totalParticipation}
          </span>
        </div>
        <div className="bg-primary flex-1 border border-border p-2 rounded-md shadow-sm">
          <span className="block text-xs text-muted">Total Collection</span>
          <span className="block text-sm font-semibold text-white">
            {format(totalCollection)}
          </span>
        </div>
      </div>
      {tickes && tickes.length > 0 && (
        <div>
          {error && (
            <span className="text-xs text-destructive mb-1">{error}</span>
          )}

          <div className="flex items-center justify-between gap-2 mt-3 mb-8">
            <div className="flex items-center">
              <div className="bg-primary border w-9 h-9 border-border rounded-s-md p-1 flex justify-center items-center">
                <Image
                  src={gold}
                  alt="Gold"
                  className="w-7  aspect-square "
                  placeholder="blur"
                />
              </div>
              <Input
                value={prize.gold}
                type="number"
                onChange={(e) =>
                  setPrize((state) => ({
                    ...state,
                    gold: parseInt(e.target.value),
                  }))
                }
                className="!m-0 !rounded-e-md"
                placeholder="Gold "
              />
            </div>
            <div className="flex items-center">
              <div className="bg-primary w-9 h-9 border border-border rounded-s-md p-1 flex justify-center items-center">
                <Image
                  src={platinum}
                  alt="Platinum"
                  className="w-9 aspect-square "
                  placeholder="blur"
                />
              </div>
              <Input
                value={prize.platinum}
                type="number"
                onChange={(e) =>
                  setPrize((state) => ({
                    ...state,
                    platinum: parseInt(e.target.value),
                  }))
                }
                className="!m-0 !rounded-e-md"
                placeholder="Platinum "
              />
            </div>
            <div className="flex items-center">
              <div className="bg-primary border w-9 h-9 rounded-s-md border-border rounded-sm p-1 flex justify-center items-center">
                <Image
                  src={diamond}
                  alt="Diamond"
                  className="w-7 aspect-square "
                  placeholder="blur"
                />
              </div>
              <Input
                type="number"
                value={prize.diamond}
                onChange={(e) =>
                  setPrize((state) => ({
                    ...state,
                    diamond: parseInt(e.target.value),
                  }))
                }
                className="!m-0 !rounded-e-md"
                placeholder="diamond "
              />
            </div>
          </div>
          <div className="max-h-[500px] overflow-y-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Ticket Id</TableHead>
                  <TableHead>Prize</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {tickes.map((t, i) => (
                  <TableRow key={i}>
                    <TableCell className="font-medium text-white">
                      {t.id}
                    </TableCell>
                    <TableCell className=" text-white">
                      <div className={cn("flex items-center gap-1")}>
                        <Image
                          onClick={() =>
                            handleSetUserForPrize(t.id, prize.gold)
                          }
                          src={gold}
                          alt="Gold"
                          className={cn(
                            "w-4 aspect-square rounded-full p-[2px]",
                            `${
                              prize.gold == checkUserIsSelected(t.id)?.prize &&
                              "border border-[#FB8500]"
                            }`
                          )}
                          placeholder="blur"
                        />
                        <Image
                          onClick={() =>
                            handleSetUserForPrize(t.id, prize.platinum)
                          }
                          src={platinum}
                          width={100}
                          height={100}
                          alt="Platinum"
                          className={cn(
                            "w-5 aspect-square  rounded-full p-[2px]",
                            `${
                              prize.platinum ==
                                checkUserIsSelected(t.id)?.prize &&
                              "border border-[#95DACA]"
                            }`
                          )}
                          placeholder="blur"
                        />
                        <Image
                          onClick={() =>
                            handleSetUserForPrize(t.id, prize.diamond)
                          }
                          src={diamond}
                          width={100}
                          height={100}
                          alt="Diamond"
                          className={cn(
                            "w-4 aspect-square rounded-full p-[2px]",
                            `${
                              prize.diamond ==
                                checkUserIsSelected(t.id)?.prize &&
                              "border border-[#D10046]"
                            }`
                          )}
                          placeholder="blur"
                        />
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
          <div className="flex items-center justify-end py-4">
            <Button
              onClick={handleDraw}
              size={"sm"}
              disabled={!selectedUsers || selectedUsers!.length == 0}
            >
              Draw
            </Button>
          </div>
        </div>
      )}

      {dataLoading && (
        <div className="">
          <div className="flex items-center gap-2 my-3">
            <Skeleton className="h-16 flex-1" />
            <Skeleton className="h-16 flex-1" />
          </div>
          <div className="flex items-center gap-2 my-2">
            <Skeleton className="h-8" />
            <Skeleton className="h-8" />
            <Skeleton className="h-8" />
          </div>
          <div className="mt-4 flex flex-col gap-3">
            <Skeleton className="h-12" />
            <Skeleton className="h-12" />
            <Skeleton className="h-12" />
            <Skeleton className="h-12" />
            <Skeleton className="h-12" />
            <Skeleton className="h-12" />
          </div>
        </div>
      )}

      {tickes && tickes.length == 0 && (
        <span className="text-sm text-muted block text-center py-6">
          No Tickets Found
        </span>
      )}
      {isLoading && <Loader />}
    </div>
  );
};

export default TicketListAdmin;
