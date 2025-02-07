"use client";
import Loader from "@/components/GameLoader";
import GameHeader from "@/components/multiplier/GameHeader";
import Wheel from "@/components/wheel/Wheel";
import { useFetchWalletDataQuery } from "@/lib/features/api/walletApiSlice";
import { useWheel } from "@/lib/store";
import { Games } from "@/types/enum";
import React, { useEffect } from "react";

const WheelPage = () => {
  const prizes = [
    {
      name: "Try",
      bg: "#FD7E17",
      color: "white",
    },
    { name: "10x", bg: "#FC9E13", color: "white" },
    { name: "Try", bg: "#FF2A0D", color: "white" },
    { name: "1x", bg: "#737373", color: "white" },
    { name: "100x", bg: "#017662", color: "white" },
    { name: "Free Spin", bg: "#6B11F8", color: "white" },
    { name: "1.5", bg: "#D70B64", color: "white" },
    { name: "Try", bg: "#1EA8FF", color: "white" },
  ];

  const { wallet, setWallet } = useWheel((state) => state);

  const { data, isLoading } = useFetchWalletDataQuery();
  const mainAccount = data?.payload?.mainWallet;

  useEffect(() => {
    if (data) {
      setWallet(mainAccount!.account!);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

  return (
    <div className="py-4 px-2 wheel-bg">
      <div className="container">
        <GameHeader account={wallet} game={Games.WHEEL} />
        <Wheel items={prizes} />
      </div>

      {isLoading && <Loader />}
    </div>
  );
};

export default WheelPage;
