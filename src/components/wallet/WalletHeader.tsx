import { getCurrentUser } from "@/lib/getCurrentUser";
import { Gem } from "lucide-react";
import React from "react";
import SigunoutButton from "@/components/SigunoutButton";

const WalletHeader = async () => {
  const user = await getCurrentUser();
  const firstName = user?.fullName.split(" ")[0];
  const lastName = user?.fullName.replace(firstName!, "");
  return (
    <div className="bg-primary  px-3 py-5 flex items-center justify-between border-b border-b-border">
      <div>
        <h3 className="text-base font-semibold text-white">
          <Gem className="inline w-5 h-5 mr-2" />
          <span>{firstName}</span>
          <span className="text-brand">{lastName}</span>
        </h3>
      </div>
      <SigunoutButton />
    </div>
  );
};

export default WalletHeader;
