"use client";
import DataLoader from "@/components/DataLoade";
import PageHeader from "@/components/headers/PageHeader";
import { useCurrentUser } from "@/hook/useGetUser";
import { useFetchUserQuery } from "@/lib/features/api/usersApiSlice";
import { Copy } from "lucide-react";
import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "Refer  | CasinoCity24",
  description:
    "Share your referral code and earn rewards! Invite friends to join Bangladesh’s top online casino and betting site and win together.",
};

const ReferCodePage = () => {
  const user = useCurrentUser();
  const { data, isLoading } = useFetchUserQuery({ id: user!.id });
  const referCode = data?.payload.user.my_ref;

  const handleCopy = () => {
    navigator.clipboard.writeText(referCode!);
  };
  return (
    <div className="px-2 container">
      {data && (
        <>
          <PageHeader title="Refer" />

          <div className=" py-6 flex flex-col items-center justify-center">
            <h4 className="text-center text-lg text-white font-semibold">
              My Refer Code
            </h4>

            <button
              onClick={handleCopy}
              className="bg-primary-foreground mt-2 px-2 py-2 flex items-center gap-2 cursor-pointer text-white text-sn"
            >
              {referCode}
              <Copy className="w-4 h-4" />
            </button>
          </div>
        </>
      )}
      {isLoading && <DataLoader />}
    </div>
  );
};

export default ReferCodePage;
